import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  btnContainer:{
    width: '100%',
    padding: 10,
    backgroundColor: '#333333',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 30
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
  cameraChild:{
    width: 100,
    height: 150,
    backgroundColor: 'red',
    position: 'absolute',
    right: 10,
    top: 50,
    borderRadius: 5
  }
});
