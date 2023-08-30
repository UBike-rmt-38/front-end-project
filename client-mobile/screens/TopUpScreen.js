import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { WebView } from "react-native-webview";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_BALANCE } from "../constants/query";
import {
  MUTATION_GENERATE_MIDTRANS_TOKEN,
  MUTATION_TOPUP_BALANCE,
} from "../constants/mutation";
import { useNavigation } from "@react-navigation/native";

export default function TopUpScreen() {
  const navigation = useNavigation()
  const [topupAmount, setTopupAmount] = useState("");
  const [message, setMessage] = useState({ text: "", style: {} });
  const [balance, setBalance] = useState(null);
  const [showWebView, setShowWebView] = useState(false);
  const [webViewUrl, setWebViewUrl] = useState("");
  const { data } = useQuery(QUERY_BALANCE);
  const [topUpBalance] = useMutation(MUTATION_TOPUP_BALANCE);
  const [generateMidtransToken, { loading, error }] = useMutation(
    MUTATION_GENERATE_MIDTRANS_TOKEN
  );
  const [nominals, setNominals] = useState([10000, 20000, 50000, 100000]);
  useEffect(() => {
    if (data) {
      setBalance(data.balance);
    }
  }, [data]);

  const handleTopup = async () => {
    if (topupAmount < 10000) {
      setMessage({
        text: "Minimum input amount is 10.000!",
        style: { color: "red", fontWeight: "bold" },
      });
      setTimeout(() => {
        setMessage({ text: "", style: {} });
      }, 5000);
      return;
    }
    try {
      const response = await generateMidtransToken({
        variables: { amount: parseInt(topupAmount) },
      });

      console.log("Token generate:", response);
      setShowWebView(true);
      setWebViewUrl(response.data.generateMidtranToken.redirect_url);

      await topUpBalance({
        variables: { amount: parseInt(topupAmount) },
      });
    } catch (error) {
      console.error("Top-up error:", error);
    }
  };

  const redirect = (state) => {
    const { url } = state;
    console.log(url);

    if (url.includes("success")) {
      setTimeout(() => {
        setShowWebView(false);
        navigation.navigate("Home"); 
      }, 5000);
    } else if (!url.includes("payment-list")) {
      setTopupAmount("");
    }
  };


  if (showWebView) {
    return (
      <WebView
        onNavigationStateChange={redirect}
        source={{ uri: webViewUrl }}
      />
    );
  }
  const buttonRow = 2;
  const rows = Math.ceil(nominals.length / buttonRow);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Input amount {balance}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={topupAmount.toString()}
        onChangeText={setTopupAmount}
        required
      />
      {error && <Text>Error: {error.message}</Text>}
      {message.text !== "" && <Text style={message.style}>{message.text}</Text>}
      <TouchableOpacity
        title="Top Up"
        onPress={handleTopup}
        disabled={loading}
        style={styles.buttonTopUp}
      >
        <Text style={styles.buttonText}>Top Up</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        {Array.from({ length: rows }).map((_, index) => (
          <View key={index} style={styles.rowContainer}>
            {nominals
              .slice(index * buttonRow, (index + 1) * buttonRow)
              .map((nominal) => (
                <TouchableOpacity
                  key={nominal}
                  onPress={() => setTopupAmount(nominal.toString())}
                  disabled={loading}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>{nominal}</Text>
                </TouchableOpacity>
              ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#322D3A",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#80FFCC",
    borderBottomWidth: 2,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonTopUp: {
    backgroundColor: "#3FDA9C",
    padding: 10,
    margin: 10,
    borderRadius: 30,
    width: "80%",
  },
  button: {
    backgroundColor: "#3FDA9C",
    padding: 10,
    margin: 10,
    borderRadius: 30,
    width: "70%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowContainer: {
    flexDirection: "column",
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: 'yellow',
    width: "45%",
    paddingVertical: 1,
  },
});
