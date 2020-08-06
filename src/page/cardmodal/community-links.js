import { faReddit } from "@fortawesome/free-brands-svg-icons/faReddit";
import { faSteam } from "@fortawesome/free-brands-svg-icons/faSteam";
import { faYoutube } from "@fortawesome/free-brands-svg-icons/faYoutube";
import { faSquare } from "@fortawesome/free-solid-svg-icons/faSquare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import css from "page/CardDetailsModal.module.scss";
import { ButtonGroupStyle, ButtonInGroupStyle } from "page/filters/ButtonFilterGroup";
import React from "react";

export default function CommunityLinks({ name }) {
  return (
    <div>
      <h3>Continue exploring</h3>
      <ButtonGroupStyle>
        <ButtonInGroupStyle>
          <a
            href={`https://www.reddit.com/r/MinionMasters/search?q=${name}&restrict_sr=1`}
            target="_blank"
            rel="noopener noreferrer"
            className={css.redditIcon}
          >
            <span className={classNames("fa-layers fa-fw")}>
              <FontAwesomeIcon icon={faSquare} />
              <FontAwesomeIcon
                icon={faReddit}
                color="#fd7e14"
                size="lg"
                mask={["far", "circle"]}
              />{" "}
            </span>
            <span> Reddits for {name}</span>
          </a>
        </ButtonInGroupStyle>
      </ButtonGroupStyle>
      <ButtonGroupStyle style={{ paddingTop: "5px" }}>
        <ButtonInGroupStyle>
          <a
            href={`https://steamcommunity.com/app/489520/discussions/search/?q=${name}&gidforum=350543738456481917&include_deleted=1`}
            target="_blank"
            rel="noopener noreferrer"
            className={css.steamIcon}
            color="#fd7e14"
          >
            <span className={classNames("fa-layers fa-fw")}>
              <FontAwesomeIcon icon={faSquare} size="lg" />
              <FontAwesomeIcon icon={faSteam} size="lg" mask={["far", "circle"]} />{" "}
            </span>
            <span> Steam discussions for {name}</span>
          </a>
        </ButtonInGroupStyle>
      </ButtonGroupStyle>

      <ButtonGroupStyle style={{ paddingTop: "5px" }}>
        <ButtonInGroupStyle>
          <a
            href={`https://www.youtube.com/results?search_query=minionmasters+${name}`}
            target="_blank"
            rel="noopener noreferrer"
            color="#FF0000"
          >
            <span className={classNames("fa-layers fa-fw")}>
              <FontAwesomeIcon icon={faSquare} size="s" />
              <FontAwesomeIcon
                icon={faYoutube}
                size="lg"
                mask={["far", "circle"]}
                color="#FF0000"
              />{" "}
            </span>
            <span style={{ paddingLeft: "2px" }}>
              {"  "} Steam discussions for {name}
            </span>
          </a>
        </ButtonInGroupStyle>
      </ButtonGroupStyle>
    </div>
  );
}
