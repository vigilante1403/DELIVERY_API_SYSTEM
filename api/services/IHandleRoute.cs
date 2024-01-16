using api.Models;

namespace api.services{
    public interface IHandleRoute{
         int ChooseRoute(AllPlacesInCountry start,AllPlacesInCountry end);
    }
}