import { YoutubeIcon } from "components/community/youtube-icon";
import { CURRENT_GAME_VERSION, useCurrentUser } from "components/helper";
import AddMasterToDeckOrOpenDetailsActionOverlay
  from "page/deck-manager/build/masters/add-master-to-deck-or-open-details-action-overlay";
import Master from "page/deck-manager/build/masters/master";
import CardForDeckActionOverlay from "page/deck-manager/deck/cardfordeck-actionoverlay";
import { DeckCardsContainerStyle } from "page/deck-manager/deck/deck-cards-container-style";
import { DeckMasterAndCardsContainerStyle } from "page/deck-manager/deck/deck-master-and-cards-container-style";
import { CopyDeckToGameButton } from "page/deck-manager/deck/decks/copy-deck-to-game-button";
import DeckDescription from "page/deck-manager/deck/decks/deck-description";
import { RedditEmbed } from "page/deck-manager/deck/decks/reddit-embed";
import css from "page/deck-manager/deck/decks/saved-deck.module.scss";
import { YourSavedDeckEdit } from "page/deck-manager/deck/decks/your-saved-deck-edit";
import { ExportAsUrlFromSavedDeck } from "page/deck-manager/deck/export/export-as-url";
import React from "react";

export function SavedDeck({
  deck: {
    dbid,
    createdAt,
    createdAtVersion,
    createdByDisplayName,
    createdByUid,
    deckname,
    description,
    youtubeLink,
    redditLink,
    master,
    cards,
  },
  deck,
  setSelectedMaster,
  setLastSelectedCards,
}) {
  const currentUser = useCurrentUser();

  return (
    <fieldset className={css.singleDeck} key={dbid} data-dbid={dbid}>
      <legend>
        <div className={css.deckLegend}>{deckname}</div>
      </legend>
      <div className={css.deckRightLegend}>
        v{createdAtVersion ? createdAtVersion : CURRENT_GAME_VERSION}
      </div>
      <div className={css.deckRightBottomLegend}>
        by {createdByDisplayName ? createdByDisplayName : "unknown"}
      </div>

      <div className={css.deckLeftBottomLegend}>
        <CopyDeckToGameButton master={master} cards={cards} />
      </div>

      <div className={css.deckLeftBottomSecondaryLegend}>
        <ExportAsUrlFromSavedDeck
          deckId={dbid}
          title={deckname}
          description={description}
          selectedMaster={master}
          lastSelectedCards={cards}
        />
      </div>

      {/*
        <div className={css.deckLeftBottomThirdLegend}>
          <ButtonGroupStyle>
            <div className={classnames(cssButton.buttonSpacing, cssButton.ButtonInGroupStyle)}>
              <FontAwesomeIcon icon={faEdit} />
              <span className={cssHelpers.hideOnMobile}>Edit</span>
            </div>
          </ButtonGroupStyle>
        </div>
        */}

      <div>
        <DeckMasterAndCardsContainerStyle
          masterEl={
            <div>
              <Master
                masterKey={master}
                actionRegistrationComponent={(selectedMasterKey) => (
                  <AddMasterToDeckOrOpenDetailsActionOverlay
                    masterKey={selectedMasterKey}
                    setSelectedMaster={setSelectedMaster}
                  />
                )}
              />
            </div>
          }
        >
          <DeckCardsContainerStyle
            lastSelectedCards={cards}
            cardActionWrapper={(card) => (
              <CardForDeckActionOverlay card={card} setLastSelectedCards={setLastSelectedCards} />
            )}
          />
        </DeckMasterAndCardsContainerStyle>

        {youtubeLink && (
          <div>
            <a href={youtubeLink} target="_blank" rel="noopener noreferrer">
              <YoutubeIcon>Watch replay</YoutubeIcon>
            </a>
          </div>
        )}

        {description && <DeckDescription description={description} />}

        {redditLink && <RedditEmbed redditLink={redditLink} />}

        {currentUser && createdByUid === currentUser.uid && <YourSavedDeckEdit deck={deck} />}
      </div>
    </fieldset>
  );
}
