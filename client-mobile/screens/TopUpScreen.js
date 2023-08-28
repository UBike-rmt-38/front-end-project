import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useNavigation } from '@react-navigation/native';

const QUERY_BALANCE = gql`
  query Query {
    balance
  }
`;

const MUTATION_TOPUP_BALANCE = gql`
  mutation Mutation($amount: Int!) {
    topUpBalance(amount: $amount)
  }
`;

const MUTATION_GENERATE_MIDTRANS_TOKEN = gql`
  mutation Mutation($amount: Int) {
    generateMidtranToken(amount: $amount) {
      redirect_url
      token
    }
  }
`;

export default function TopUpScreen() {
  const [topupAmount, setTopupAmount] = useState('');
  const [balance, setBalance] = useState(null);
  const [showWebView, setShowWebView] = useState(false);
  const [webViewUrl, setWebViewUrl] = useState('');
  const { data } = useQuery(QUERY_BALANCE);
  const [topUpBalance] = useMutation(MUTATION_TOPUP_BALANCE);
  const [generateMidtransToken, { loading, error }] = useMutation(
    MUTATION_GENERATE_MIDTRANS_TOKEN
  );

  useEffect(() => {
    if (data) {
      setBalance(data.balance);
    }
  }, [data]);

  const handleTopup = async () => {
    try {
      const response = await generateMidtransToken({
        variables: { amount: parseInt(topupAmount) },
      });

      console.log('Token generate:', response);
      setShowWebView(true);
      setWebViewUrl(response.data.generateMidtranToken.redirect_url);

      await topUpBalance({
        variables: { amount: parseInt(topupAmount) },
      });
    } catch (error) {
      console.error('Top-up error:', error);
    }
  };

  const redirect = (state) => {
    const { url } = state
    console.log(url);
    if(url && url.includes("success")){
        setTimeout(() => {
            setShowWebView(false);
        }, 5000);
    }
  }

  if (showWebView) {
    return <WebView onNavigationStateChange={redirect} source={{ uri: webViewUrl }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Top Up</Text>
      <Text>Current balance: {balance}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter top up amount"
        keyboardType="numeric"
        value={topupAmount}
        onChangeText={setTopupAmount}
      />
      <Button title="Top Up" onPress={handleTopup} disabled={loading} />
      {error && <Text>Error: {error.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
