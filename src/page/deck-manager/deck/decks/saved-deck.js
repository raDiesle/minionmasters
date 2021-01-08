import * as classnames from "classnames";
import { YoutubeIcon } from "components/community/youtube-icon";
import {  isForImagePreview, useCurrentUser } from "components/helper";
import {  CURRENT_GAME_VERSION } from "components/version";

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
import { CopyDeckToGameButton } from "page/deck-manager/deck/import-export/export/copy-deck-to-game-button";
import { ExportAsUrlFromSavedDeck } from "page/deck-manager/deck/import-export/url-import-export/export-as-url";
import { RarityChart } from "page/deck-manager/savedeck/analyze/rarity-chart";
import { BOTH, SOLO, TEAM } from "page/deck-manager/savedeck/saved-decks-configs";
import React from "react";
import ReactTimeAgo from "react-time-ago";

export function SavedDeck({
  deck: {
    dbid,
    createdAtVersion,
    createdAt,
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
    <fieldset
      className={classnames(!isForImagePreview && css.singleDeckFieldset)}
      key={dbid}
      data-dbid={dbid}
    >
      <legend>
        <h3 className={css.deckName}>
          {deckname} --- by {createdByDisplayName ? createdByDisplayName : "unknown"}
        </h3>
      </legend>

      <div className={css.lastCreatedAt}>
        created <ReactTimeAgo date={createdAt} />
      </div>
      <div className={css.legendGameVersion}>
        v{createdAtVersion ? createdAtVersion : CURRENT_GAME_VERSION}
      </div>

      {isEmpty(premadeCards) && (
        <div className={css.legendCopyToGame}>
          <CopyDeckToGameButton master={master} cards={cards} />
        </div>
      )}
      <div className={css.legendShareLink}>
        <ExportAsUrlFromSavedDeck
          deckId={dbid}
          title={deckname}
          description={description}
          selectedMaster={master}
          lastSelectedCards={cards}
          selectedPremadeMaster={premadeMaster}
          lastSelectedPremadeCards={premadeCards}
        />
      </div>

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

        <RarityChart lastSelectedCards={cards} />

        {!isEmpty(premadeCards) && (
          <>
            {!isForImagePreview && (
              <div className={css.inlineButtons}>
                <CopyDeckToGameButton master={master} cards={cards} />
              </div>
            )}

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

            <RarityChart lastSelectedCards={premadeCards} />

            {!isForImagePreview && (
              <div className={css.inlineButtons}>
                <CopyDeckToGameButton master={premadeMaster} cards={premadeCards} />
              </div>
            )}
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
