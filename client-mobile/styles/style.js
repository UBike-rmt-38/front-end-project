import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end"
  },
  label: {
    color: 'white',
    fontSize: 25,
    lineHeight: 84,
    fontWeight: 'bold',
    marginLeft: 45
  },
  box: {
    alignItems: "center",
    marginBottom: 10
  },
  inline_box: {
    borderRadius: 50,
    height: 600,
    backgroundColor: 'rgba(120, 120, 120, 0.4)',
    width: 480,
    shadowColor: '#000',
    shadowOffset: {
      height: 30,
      width: 30
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#808090"
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#ffff",
    width: 400,
    borderRadius: 10,
    fontSize: 20
  },
  input_container: {
    flex: 1,
    alignItems: "center"
  },
  item_box: {
    marginVertical: 30
  },
  btn_div: {
    marginTop: 40,
    height: 60,
    width: '80%',
    marginHorizontal: 50,
    borderRadius: 30,
    backgroundColor: 'rgba(128, 128, 128, 0.8)',
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#808080",
    borderWidth: 1,
    flexDirection: "row"
  },
  btn: {
    color: "#ffff",
    fontWeight: "bold",
    fontSize: 26,
    marginHorizontal: 30
  }
})

export default styles