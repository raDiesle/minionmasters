import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGaTrackView } from "footer/consent-cookie-banner";

import CardDescription from "page/card-modal/card-description";

import css from "page/card-modal/card-details-modal.module.scss";
import CardProperties from "page/card-modal/card-properties";
import CommunityLinks from "page/card-modal/community-links";
import CommunityTips from "page/discussion/CardDiscussion";
import React, { useState } from "react";
import ReactModal from "react-modal";

export default function CardDetailsModal({
  card,
  card: { description, name, iD },
  isOpenDetails,
  setIsOpenDetails,
}) {
  useGaTrackView(`/CardDetailsModal/${name}`);

  const [isNestedModalOpened, setIsNestedModalOpened] = useState(false);
  /*
  trying to make back button in browser to close modal
  const history = useHistory();
  const location = useLocation();
  console.log("current:" + location.pathname + location.search);
  const cardModalId = `/card-modal?iD=${iD}`;

  console.log("rendered");
  useEffect(() => {
    history.push(cardModalId);
    return () => {
      history.goBack(-1);
      console.log("close");
    };
  }, []);

  useEffect(() => {
    return history.listen((location) => {
      if (cardModalId)
        console.log(
          `You changed the page from : ${cardModalId} to: ${location.pathname}${location.search}`
        );

      if (isNestedModalOpened === false && cardModalId !== location.pathname + location.search) {
        setIsOpenDetails(false);
      }
    });
  }, [history]);
*/

  return (
    <div>
      {isNestedModalOpened && (
        <CardDetailsModal
          key={card.iD}
          card={card}
          isOpenDetails={true}
          setIsOpenDetails={setIsNestedModalOpened}
        />
      )}

      <ReactModal
        isOpen={isOpenDetails}
        onRequestClose={() => setIsOpenDetails(false)}
        className="modalContentStyle"
        overlayClassName="modalOverlayStyle"
      >
        <div className={css.ModalContainerStyle} data-name={name}>
          <div className={css.ModalAlignCloseStyle}>
            <div className={css.ModalCloseStyle}>
              <FontAwesomeIcon
                icon={faTimesCircle}
                size={"2x"}
                onClick={() => setIsOpenDetails(false)}
              />
            </div>
          </div>

          <h2 className={css.CardHeaderStyle}>{name}</h2>

          <CardProperties card={card} />

          <CardDescription description={description} />

          <CommunityTips card={card} discussionType="mechanics" />

          <CommunityLinks name={name} />
        </div>
      </ReactModal>
    </div>
  );
}
