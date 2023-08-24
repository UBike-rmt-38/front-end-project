import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  image: {
    width: 330,
    height: 334,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageBackground: {
    position: "absolute",
    height: 932,
    width: 430,
  },
  gridRow: {
    flex: 1,
    flexDirection: "column",
    marginVertical: 60,
    marginHorizontal: 16,
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    justifyContent: "center",
    backgroundColor: "#808080",
    padding: 15,
    width: 330,
    height: 60,
    borderRadius: 90,
  },
  textTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 32,
  },
  textDescription: {
    color: "white",
    fontWeight: "normal",
    fontSize: 16,
  },
  buttonText: {
    color: "white",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default styles;
