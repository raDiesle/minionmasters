import classNames from "classnames";
import { anchorLinkTarget } from "components/helper";
import { MENU_LINKS_CONFIG } from "page/wiki/resource-mngt/resource-mgmt";
import React from "react";
import css from "page/wiki/static-content.module.scss";

export default function LevelupRewards() {
  return (
    <div>
      {anchorLinkTarget(MENU_LINKS_CONFIG["Level up Rewards"])}

      <div className={css.itemsArea}>
        <fieldset>
          <legend>Level 01-50</legend>
          <div className={css.table}>
            <div className={css.tableRow}>
              <div
                className={classNames(css.tableCell, css.tableHeader)}
                style={{ minWidth: "30px" }}
              >
                <span className={css.hideOnMobile}>Level</span>
              </div>
              <div className={classNames(css.tableCell, css.tableHeader)}>Reward</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>1</div>
              <div className={css.tableCell}>Tutorial</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>2</div>
              <div className={css.tableCell}>(Common Card) Cleaver</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>3</div>
              <div className={css.tableCell}>(Rare Card) Stun Lancers</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>4</div>
              <div className={css.tableCell}>(Common Card) Dragon Whelp</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>5</div>
              <div className={css.tableCell}>(Common Card) Sniper Scrat</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>6</div>
              <div className={css.tableCell}>1 Power Token</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>7</div>
              <div className={css.tableCell}>
                <b>Unlock Team Battle</b>, <b>Unlock Shop</b>, 1000 Gold
              </div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>8</div>
              <div className={css.tableCell}>
                <b>Unlock Daily Quests</b>, (Common Card) Crossbow Dudes
              </div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>9</div>
              <div className={css.tableCell}>
                <b>Unlock Battle Pass</b>, (Common Card) Swarmers x16
              </div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>10</div>
              <div className={css.tableCell}>
                (Common Card) Daggerfall x3, +50% Win Bonus Gold For 3 Days
              </div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>11</div>
              <div className={css.tableCell}>
                <b>Unlock Expeditions</b>, (Rare Card) Crossbow Guild x3
              </div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>12</div>
              <div className={css.tableCell}>
                <b>Unlock Draft</b>, Daft Ticket
              </div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>13</div>
              <div className={css.tableCell}>(Common Card) Beam of DOOM! x6</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>14</div>
              <div className={css.tableCell}>
                <b>Unlock Mayhem</b>, 1000 Gold
              </div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>15</div>
              <div className={css.tableCell}>350 Rubies</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>16</div>
              <div className={css.tableCell}>Stun Lancers Avatar, 1000 Gold</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>17</div>
              <div className={css.tableCell}>(Rare Card) Annihilator x6</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>18</div>
              <div className={css.tableCell}>1000 Gold</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>19</div>
              <div className={css.tableCell}>1000 Gold</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>20</div>
              <div className={css.tableCell}>Three Extra Deck Slots</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>21</div>
              <div className={css.tableCell}>1000 Gold</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>22</div>
              <div className={css.tableCell}>Draft Ticket x2</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>23</div>
              <div className={css.tableCell}>1000 Gold</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>24</div>
              <div className={css.tableCell}>1000 Gold</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>25</div>
              <div className={css.tableCell}>(Rare Card) Last Stand x6</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>26</div>
              <div className={css.tableCell}>Scrat Pack Avatar, 1000 Gold</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>27</div>
              <div className={css.tableCell}>100 Shards</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>28</div>
              <div className={css.tableCell}>1000 Gold</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>29</div>
              <div className={css.tableCell}>1000 Gold</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>30</div>
              <div className={css.tableCell}>(Arena) Tranquil Estate</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>31</div>
              <div className={css.tableCell}>1000 Gold</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>32</div>
              <div className={css.tableCell}>1000 Gold</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>33</div>
              <div className={css.tableCell}>100 Shards</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>34</div>
              <div className={css.tableCell}>1000 Gold</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>35</div>
              <div className={css.tableCell}>250 Rubies</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>36</div>
              <div className={css.tableCell}>Legionnaires Avatar, 1000 Gold</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>37</div>
              <div className={css.tableCell}>1000 Gold</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>38</div>
              <div className={css.tableCell}>+50% win bonus gold for 7 days</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>39</div>
              <div className={css.tableCell}>1000 Gold</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>40</div>
              <div className={css.tableCell}>Three Extra Deck Slots</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>41</div>
              <div className={css.tableCell}>1000 Gold</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>42</div>
              <div className={css.tableCell}>1000 Gold</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>43</div>
              <div className={css.tableCell}>Draft Ticket x2</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>44</div>
              <div className={css.tableCell}>1000 Gold</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>45</div>
              <div className={css.tableCell}>500 Rubies</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>46</div>
              <div className={css.tableCell}>Spirit Vessel Avatar, 1000 Gold</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>47</div>
              <div className={css.tableCell}>1000 Gold</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>48</div>
              <div className={css.tableCell}>100 Shards</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>49</div>
              <div className={css.tableCell}>1000 Gold</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>50</div>
              <div className={css.tableCell}>(Arena) Crashsite</div>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>51 > repeats itself every 10 levels</legend>

          <div className={css.table}>
            <div className={css.tableRow}>
              <div
                className={classNames(css.tableCell, css.tableHeader)}
                style={{ minWidth: "30px" }}
              >
                <span className={css.hideOnMobile}>Level</span>
              </div>
              <div className={classNames(css.tableCell, css.tableHeader)}>Reward</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>X1</div>
              <div className={css.tableCell}>1000 Gold</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>X2</div>
              <div className={css.tableCell}>1000 Gold</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>X3</div>
              <div className={css.tableCell}>+50% win bonus gold for 3 days</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>X4</div>
              <div className={css.tableCell}>1000 Gold</div>
            </div>

            <div className={css.tableRow}>
              <div className={css.tableCell}>X5</div>
              <div className={css.tableCell}>200 Rubies</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>X6</div>
              <div className={css.tableCell}>1000 Gold</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>X7</div>
              <div className={css.tableCell}>1000 Gold</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>X8</div>
              <div className={css.tableCell}>2 Power Tokens</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>X9</div>
              <div className={css.tableCell}>1000 Gold</div>
            </div>
            <div className={css.tableRow}>
              <div className={css.tableCell}>X0</div>
              <div className={css.tableCell}>350 Rubies</div>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
}
