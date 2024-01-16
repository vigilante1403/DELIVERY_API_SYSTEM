using api.Models;
using Microsoft.AspNetCore.Mvc.Formatters;

namespace api.services{
    public class HandleRoute:IHandleRoute{
        public int ChooseRoute(AllPlacesInCountry start,AllPlacesInCountry end){
            var startState = start.State;
            var endState = end.State;
            var chooseId2=0;
            if(startState==endState){ //xet cung vung
                if(start.Specila==true && end.Specila==true){//cung la tp
                    if(start.Id==end.Id){//cung 1 noi
                        chooseId2=2;
                    }else{ //khac noi
                        chooseId2=3;
                    }
                    
                }else{
                    if(start.Specila==true||end.Specila==true){
                        chooseId2=3;
                    }
                   else{
                        if(start.Id!=end.Id){
                            chooseId2=4; //gui trong 2 tinh cung 1 vung
                        }else{
                            chooseId2=1;//chung tinh
                        }
                    }
                }
            }else{ //xet khac vung
                if(start.Specila==true&&end.Specila==true){ //hn hcm
                    chooseId2=5;
                }else if(start.Specila==true||end.Specila==true){ //1 trong 2 la tp
                    chooseId2=6;
                }else{
                    chooseId2=7;
                }
            }
            return chooseId2;
          
        }

    }
}