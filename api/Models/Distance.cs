namespace api.Models{
    public class Location
{
    public double Latitude { get; set; }
    public double Longitude { get; set; }
}
   public class Step
{
    public Duration duration { get; set; }
    public DistanceMatrix Distance { get; set; }
    public DurationMatrix Duration { get; set; }
}
public class DistanceMatrix
{
    public string Text { get; set; }
    public int Value { get; set; }
}

public class DurationMatrix
{
    public string Text { get; set; }
    public int Value { get; set; }
}
public class Leg
{
    public Step[] steps { get; set; }
    public Duration duration { get; set; }
}

public class Route
{
    public Leg[] legs { get; set; }
}

public class DirectionsResponse
{
    public string status { get; set; }
    public Route[] routes { get; set; }
}

public class Duration
{
    public double value { get; set; }
}
public class Result
{
    public Geometry geometry { get; set; }
}

public class Geometry
{
    public Location location { get; set; }
}

public class GeocodingResponse
{
    public string status { get; set; }
    public Result[] results { get; set; }
}

}