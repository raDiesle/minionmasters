import React, { useEffect, useState, useMemo } from "react";
import cssButton from "components/button.module.scss";
import Tooltip from "rc-tooltip";
import * as classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons/faUserFriends";
import cssHelpers from "components/helper.module.scss";

const useAudio = url => {
  const audio = useMemo(() => new Audio(url), []);
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  audio.ontimeupdate= function(i) {
    // 50 ms
    const isJustFinishedPlaying = this.currentTime / this.duration;

    if(playing === true && isJustFinishedPlaying === 1){
      const DURATION = 237;
      setTimeout(() => {
      this.currentTime = 0;
      this.play();
      }, 3600 - DURATION);
    }
  };

  useEffect(() => {
    audio.addEventListener('ended', () => {
    }, false);
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

export default useAudio;

export function XpTimer(){


  useEffect(() => {
    var audio_bell = document.getElementById("audio_timer");
    setInterval(function(){
      audio_bell.play();
    }, 3600);
  }, []);


  const handleButtonClick = () => {

  }

  return  <div className={cssButton.ButtonGroupStyle}>
    <audio id="audio_timer">
      <source src="https://freesound.org/data/previews/263/263133_2064400-lq.mp3" type="audio/mpeg" />
    </audio>
    <Tooltip placement="bottomLeft" overlay={<span>3.6 seconds to know whenever XP is retrieved.</span>}>
      <button
        className={classnames(
          cssButton.buttonSpacingNoTextOnMobile,
          cssButton.ButtonInGroupStyle
        )}
        onClick={() => handleButtonClick()}
      >
        <FontAwesomeIcon icon={faUserFriends} />
        <span className={cssHelpers.hideOnMobile}>XP Timer ( )</span>
      </button>
    </Tooltip>
  </div>
}