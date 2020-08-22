import { db } from "mm-firestore";
import { ButtonGroupStyle } from "page/deck-manager/build/filters/ButtonFilterGroup";
import { ConfirmDeleteButtons } from "page/deck-manager/deck/decks/confirm-delete-buttons";
import { EditButtons } from "page/deck-manager/deck/decks/edit-buttons";
import SaveOrEditDeckForm from "page/deck-manager/savedeck/save-or-edit-deck-form";
import React, { useState } from "react";

export function EditSavedDeckActive({
  dbid,
  initialCreatedByDisplayName,
  initialDeckname,
  initialDescription,
  initialGameType,
  initialGameTypeSecondary,
  initialGameTypeThird,
  initialYoutubeLink,
  initialRedditLink,

  setIsEditing,
}) {
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);

  const dbRef = db.collection("decks").doc(dbid);

  return (
    <div>
      <div>
        <SaveOrEditDeckForm
          initialCreatedByDisplayName={initialCreatedByDisplayName}
          initialDeckname={initialDeckname}
          initialDescription={initialDescription}
          initialGameType={initialGameType}
          initialGameTypeSecondary={initialGameTypeSecondary}
          initialGameTypeThird={initialGameTypeThird}
          initialYoutubeLink={initialYoutubeLink}
          initialRedditLink={initialRedditLink}
          setIsEditing={setIsEditing}
          handleSaveButton={(hasValidationError, formData) => {
            return (
              <ButtonGroupStyle>
                {!isConfirmDelete ? (
                  <EditButtons
                    setIsEditing={setIsEditing}
                    setIsConfirmDelete={setIsConfirmDelete}
                    hasValidationError={hasValidationError}
                    dbRef={dbRef}
                    formData={formData}
                  />
                ) : (
                  <ConfirmDeleteButtons
                    setIsEditing={setIsEditing}
                    setIsConfirmDelete={setIsConfirmDelete}
                    dbRef={dbRef}
                  />
                )}
              </ButtonGroupStyle>
            );
          }}
        />
      </div>
    </div>
  );
}
