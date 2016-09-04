$(document).ready(function() {

  var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "hentaihentaimonsta"];
  var list = [];
  var url = "https://twitch.tv/";

  function getStream(stream) {

    var logo, dName, name, link, desc;

    $.getJSON('https://api.twitch.tv/kraken/users/' + stream + '?callback=?', function(data) {

      if (!data.error) {
        logo = data.logo;
        dName = data.display_name;
        name = data.name;
        link = url + data.name;
      } else {
        console.log('Acc Closed: ' + stream);
        logo = "https://avatars1.githubusercontent.com/u/10282105?v=3&s=460";
        dName = stream;

        $(".box").append('<li class="canaru"><img class="logo" src="' + logo + '"/><h3>' + dName + '</h3><br><p>Account closed</p></li>');
      }

      $.getJSON('https://api.twitch.tv/kraken/streams/' + stream, function(info) {

        console.log('Test: ' + link);

        if (info.stream !== null) {
          desc = info.stream.channel.status;
        }

        console.log('Desc: ' + desc);

        if (desc == undefined) {
          $(".box").append('<li class="canaru"><a href="' + link + '"><img class="logo" src="' + logo + '"/><h3>' + dName + '</h3><br><p>Offline</p></a></li>');
        } else {
          $(".box").append('<li class="canaru"><a href="' + link + '"><img class="logo" src="' + logo + '"/><h3>' + dName + '</h3><br><p>Online: ' + desc + '</p></a></li>');
        }

      });

    });

  } // End of getStream()

  for (var i = 0; i < channels.length; i++) {
    getStream(channels[i]);
  }

});