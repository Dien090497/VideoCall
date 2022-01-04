import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  page: {
    height: "100%",
    backgroundColor: "#7d4e80",
  },
  cameraPreview: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30
  },
  name: {
    color: 'white',
    fontSize:26
  },
  phoneNumber: {
    color: 'white',
    fontSize:18
  },
  btnContainer:{
    width: '100%',
    padding: 10,
    backgroundColor: '#333333',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 30,
  },
  icon:{
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    padding:10,
    borderRadius: 60,
    backgroundColor: '#4a4a4a',
  },
  goBack:{
    marginTop:50,
    marginLeft:20
  }
});
