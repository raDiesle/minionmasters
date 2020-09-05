import { YoutubeIcon } from "components/community/youtube-icon";
import { CURRENT_GAME_VERSION, useCurrentUser } from "components/helper";
import isEmpty from "lodash.isempty";
import AddMasterToDeckOrOpenDetailsActionOverlay from "page/deck-manager/build/masters/add-master-to-deck-or-open-details-action-overlay";
import Master from "page/deck-manager/build/masters/master";
import CardForDeckActionOverlay from "page/deck-manager/deck/cardfordeck-actionoverlay";
import { DeckCardsContainerStyle } from "page/deck-manager/deck/deck-cards-container-style";
import { DeckMasterAndCardsContainerStyle } from "page/deck-manager/deck/deck-master-and-cards-container-style";
import DeckDescription from "page/deck-manager/deck/decks/deck-description";
import { RedditEmbed } from "page/deck-manager/deck/decks/reddit-embed";
import css from "page/deck-manager/deck/decks/saved-deck.module.scss";
import { YourSavedDeckEdit } from "page/deck-manager/deck/decks/your-saved-deck-edit";
import { CopyDeckToGameButton } from "page/deck-manager/deck/export/copy-deck-to-game-button";
import { ExportAsUrlFromSavedDeck } from "page/deck-manager/deck/export/export-as-url";
import { BOTH, SOLO, TEAM } from "page/deck-manager/savedeck/saved-decks-configs";
import React from "react";

export function SavedDeck({
  deck: {
    dbid,
    createdAtVersion,
    createdByDisplayName,
    createdByUid,
    deckname,
    description,
    youtubeLink,
    redditLink,
    tags,
    gameType,
    gameTypeSecondary,
    gameTypeThird,
    master,
    cards,
    premadeMaster,
    premadeCards,
  },
  deck,
  setSelectedMaster,
  setLastSelectedCards,
  availableCards,
}) {
  const currentUser = useCurrentUser();

  const gameTypeToTags = [{ label: gameType, key: gameType }];
  const gameTypeSecondaryToTags =
    gameTypeSecondary === BOTH
      ? [
          { value: SOLO, label: SOLO },
          { value: TEAM, label: TEAM },
        ]
      : [{ value: gameTypeSecondary, label: gameTypeSecondary }];

  const gameTypeThirdToTags = gameTypeThird ? [{ value: gameTypeThird, label: gameTypeThird }] : [];

  return (
    <fieldset className={css.singleDeckFieldset} key={dbid} data-dbid={dbid}>
      <legend>
        <h3>
          {deckname} --- by {createdByDisplayName ? createdByDisplayName : "unknown"}
        </h3>
      </legend>
      <div className={css.deckRightLegend}>
        v{createdAtVersion ? createdAtVersion : CURRENT_GAME_VERSION}
      </div>

      {isEmpty(premadeCards) && (
        <>
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
        </>
      )}

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
            availableCards={availableCards}
          />
        </DeckMasterAndCardsContainerStyle>

        {!isEmpty(premadeCards) && (
          <>
            <div className={css.inlineButtons}>
              <CopyDeckToGameButton master={master} cards={cards} />
              <ExportAsUrlFromSavedDeck
                deckId={dbid}
                title={deckname}
                description={description}
                selectedMaster={master}
                lastSelectedCards={cards}
              />
            </div>

            <DeckMasterAndCardsContainerStyle
              masterEl={
                <div>
                  <Master
                    masterKey={premadeMaster}
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
                lastSelectedCards={premadeCards}
                cardActionWrapper={(card) => (
                  <CardForDeckActionOverlay
                    card={card}
                    setLastSelectedCards={setLastSelectedCards}
                  />
                )}
                availableCards={availableCards}
              />
            </DeckMasterAndCardsContainerStyle>
            <div className={css.inlineButtons}>
              <CopyDeckToGameButton master={premadeMaster} cards={premadeCards} />
              <ExportAsUrlFromSavedDeck
                deckId={dbid}
                title={deckname}
                description={description}
                selectedMaster={premadeMaster}
                lastSelectedCards={premadeCards}
              />
            </div>
          </>
        )}

        {!!tags && (
          <div className={css.tags}>
            {[...gameTypeToTags, ...gameTypeSecondaryToTags, ...gameTypeThirdToTags, ...tags].map(
              (tag) => (
                <div className={css.tag} key={dbid + tag.value}>
                  {tag.label}
                </div>
              )
            )}
          </div>
        )}

        {description && <DeckDescription description={description} />}

        {youtubeLink && (
          <div className={css.youtubeElement}>
            <a href={youtubeLink} target="_blank" rel="noopener noreferrer">
              <YoutubeIcon>Watch replay</YoutubeIcon>
            </a>
          </div>
        )}

        {redditLink && <RedditEmbed redditLink={redditLink} />}

        {currentUser && createdByUid === currentUser.uid && <YourSavedDeckEdit deck={deck} />}
      </div>
    </fieldset>
  );
}
