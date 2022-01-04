import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  page: {
    flex:1
  },
  background:{
    flex:1,
    textAlign: 'center',
    paddingTop: 50,
    alignItems: 'center'
  },
  textName:{
    fontSize:30,
    marginVertical:20
  },
  body:{
    flexDirection:'row',
    width:'100%',
    justifyContent: "space-between",
    paddingVertical: 30,
    paddingHorizontal: '15%'
  },
  itemBody:{
    justifyContent: 'center',
    alignItems: 'center'
  },
  textBody:{
    fontSize: 12
  },
  icon:{
    alignItems: 'center',
    justifyContent: 'center',
    height: 60, 
    width: 60,
    padding:10,
    borderRadius: 60,
    backgroundColor: '#4a4a4a',
  }
});
