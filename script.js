console.log("hi");

(function($) {
  var user = "chiaski";
  var apiKey = "28068133aa7429856cd20c240f42f3eb";
  $.getJSON(
    "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&limit=10&user=" +
      user +
      "&api_key=" +
      apiKey +
      "&format=json",
    function(response) {
      //callback function, runs upon receiving response
      console.log(response);

      let music = response.recenttracks;

      if (music.track[0].artist["#text"] == "Car Seat Headrest") {
        $(".not-playing").hide();

        $(".container").css(
          "background-image",
          "url(" + music.track[0].image[3]["#text"] + ")"
        );
        $(".now-title").text(music.track[0].name);

        if (music.track[0]["@attr"]) {
          $(".now-text").text("They are now listening to");
        } else {
          $(".now-text").text("They last listened to");
        }

        $(".now-playing").fadeIn("slow");
      } else {
        $(".now-playing").hide();
        $(".container").css("background-image", "none");

        let count = 0;

        for (track of music.track) {
          if (track.artist["#text"] !== "Car Seat Headrest") {
            count++;
          } else {
            break;
          }
        }

        if (count > 1) {
          $(".now-count").text(count + " songs ");
        } else if (count == 0) {
          $(".now-count").text("over 10 songs ");
        } else {
          $(".now-count").text(count + " song ");
        }

        $(".not-playing").fadeIn("slow");
      }
    },
    "json"
  );

  $.getJSON(
    "https://ws.audioscrobbler.com/2.0/?method=user.getweeklyartistchart&user=" +
      user +
      "&api_key=" +
      apiKey +
      "&format=json",
    function(response) {
      //callback function, runs upon receiving response
      let music = response.weeklyartistchart.artist;

      console.log(music);

      for (artist of music) {
        if (artist.name == "Car Seat Headrest") {
          $(".now-many").text(artist.playcount);
          break;
        }
      }
    },
    "json"
  );
})(jQuery); //execute wrapper function with $ = jQuery
