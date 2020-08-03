import { anchorLinkTarget } from "components/helper";
import { MENU_LINKS_CONFIG } from "page/basics/resource-mgmt";
import React from "react";
import css from "./guild-rewards.scss";

export default function GuildRewards() {
  console.log(css);
  return (
    <div>
      {anchorLinkTarget(MENU_LINKS_CONFIG["Guild Rewards"])}
      Here is the list of rewards as an example from past Season:
      <fieldset>
        <legend>Guild Rewards</legend>
        <ol>
          <li>
            {" "}
            5 x Conquest Card slot
            <br />
          </li>
          <li>
            {" "}
            1 x Conquest Card slot
            <br />
          </li>
          <li>
            {" "}
            10 x Common Card
            <br />
          </li>
          <li>
            {" "}
            1 x Conquest Card slot
            <br />
          </li>
          <li>
            {" "}
            5 x Rare Card
            <br />
          </li>
          <li>
            {" "}
            500k Account XP
            <br />
          </li>
          <li>
            {" "}
            1 x Conquest Card slot
            <br />
          </li>
          <li>
            {" "}
            15 x Common Card
            <br />
          </li>
          <li>
            {" "}
            +50 Season bonus Glory
            <br />
          </li>
          <li>
            {" "}
            Avatar
            <br />
          </li>
          <li>
            {" "}
            750k Account XP
            <br />
          </li>
          <li>
            {" "}
            1 x Conquest Card slot
            <br />
          </li>
          <li>
            {" "}
            7 x Supreme Card
            <br />
          </li>
          <li>
            {" "}
            1 x Conquest Card slot
            <br />
          </li>
          <li>
            {" "}
            3 x Supreme Cards
            <br />
          </li>
          <li>
            {" "}
            750k Account XP
            <br />
          </li>
          <li>
            {" "}
            10 x Rare Card
            <br />
          </li>
          <li>
            {" "}
            20 x Common Card
            <br />
          </li>
          <li>
            {" "}
            Guild Frame
            <br />
          </li>
          <li> 1 x Legendary Card</li>
        </ol>
      </fieldset>
      <br />
      <fieldset>
        <legend>Rewards > 20</legend>

        <ol>
          <li>
            {" "}
            3 x Common Card
            <br />
          </li>
          <li>
            {" "}
            500 x Gold
            <br />
          </li>
          <li>
            {" "}
            3 x Common Card
            <br />
          </li>
          <li>
            {" "}
            250k Account XP
            <br />
          </li>
          <li> 1 x Power Token</li>
        </ol>
      </fieldset>
      The total glory you'll receive after each victory is:
      <fieldset>
        <legend>Ranks Multiplier formula</legend>
        <p>
          <b>
            ( &lt;Conquest Card Glory&gt; + &lt;Your Deck Glory&gt; + &lt;Season Bonus Glory&gt; ) x
            &lt;Rank Multiplier&gt;{" "}
          </b>
        </p>
        <p>The multiplier for the formula above is ( xx% / 100 ) + 1.</p>
        <div>
          <img
            src="img/basics/guild_formula.png"
            alt="Guild formula"
            style={{ maxWidth: "400px", width: "100%" }}
          />
        </div>
      </fieldset>
      <fieldset>
        <legend>Glory Rewards</legend>
        Here is the amount of glory required for each tier:
        <div className="bb_table">
          <div className="bb_table_tr">
            <div className="bb_table_th">
              <b>Tier</b>
            </div>{" "}
            <div className="bb_table_th">
              <b>Mini Season Glory</b>
            </div>{" "}
            <div className="bb_table_th">
              <b>Normal Season Glory</b>
            </div>{" "}
          </div>{" "}
          <div className="bb_table_tr">
            {" "}
            <div className="bb_table_td">1</div> <div className="bb_table_td">---</div>{" "}
            <div className="bb_table_td">---</div>{" "}
          </div>{" "}
          <div className="bb_table_tr">
            {" "}
            <div className="bb_table_td">2</div> <div className="bb_table_td">145k</div>{" "}
            <div className="bb_table_td">150k</div>{" "}
          </div>{" "}
          <div className="bb_table_tr">
            {" "}
            <div className="bb_table_td">3</div> <div className="bb_table_td">155k</div>{" "}
            <div className="bb_table_td">160k</div>{" "}
          </div>{" "}
          <div className="bb_table_tr">
            {" "}
            <div className="bb_table_td">4</div> <div className="bb_table_td">165k</div>{" "}
            <div className="bb_table_td">180k</div>{" "}
          </div>{" "}
          <div className="bb_table_tr">
            {" "}
            <div className="bb_table_td">5</div> <div className="bb_table_td">175k</div>{" "}
            <div className="bb_table_td">190k</div>{" "}
          </div>{" "}
          <div className="bb_table_tr">
            {" "}
            <div className="bb_table_td">6</div> <div className="bb_table_td">185k</div>{" "}
            <div className="bb_table_td">200k</div>{" "}
          </div>{" "}
          <div className="bb_table_tr">
            {" "}
            <div className="bb_table_td">7</div> <div className="bb_table_td">195k</div>{" "}
            <div className="bb_table_td">210k</div>{" "}
          </div>{" "}
          <div className="bb_table_tr">
            {" "}
            <div className="bb_table_td">8</div> <div className="bb_table_td">205k</div>{" "}
            <div className="bb_table_td">220k</div>{" "}
          </div>{" "}
          <div className="bb_table_tr">
            {" "}
            <div className="bb_table_td">9</div> <div className="bb_table_td">215k</div>{" "}
            <div className="bb_table_td">235k</div>{" "}
          </div>{" "}
          <div className="bb_table_tr">
            {" "}
            <div className="bb_table_td">10</div> <div className="bb_table_td">230k</div>{" "}
            <div className="bb_table_td">245k</div>{" "}
          </div>{" "}
          <div className="bb_table_tr">
            {" "}
            <div className="bb_table_td">11</div> <div className="bb_table_td">240k</div>{" "}
            <div className="bb_table_td">260k</div>{" "}
          </div>{" "}
          <div className="bb_table_tr">
            {" "}
            <div className="bb_table_td">12</div> <div className="bb_table_td">255k</div>{" "}
            <div className="bb_table_td">275k</div>{" "}
          </div>{" "}
          <div className="bb_table_tr">
            {" "}
            <div className="bb_table_td">13</div> <div className="bb_table_td">265k</div>{" "}
            <div className="bb_table_td">290k</div>{" "}
          </div>{" "}
          <div className="bb_table_tr">
            {" "}
            <div className="bb_table_td">14</div> <div className="bb_table_td">280k</div>{" "}
            <div className="bb_table_td">305k</div>{" "}
          </div>{" "}
          <div className="bb_table_tr">
            {" "}
            <div className="bb_table_td">15</div> <div className="bb_table_td">300k</div>{" "}
            <div className="bb_table_td">325k</div>{" "}
          </div>{" "}
          <div className="bb_table_tr">
            {" "}
            <div className="bb_table_td">16</div> <div className="bb_table_td">315k</div>{" "}
            <div className="bb_table_td">340k</div>{" "}
          </div>{" "}
          <div className="bb_table_tr">
            {" "}
            <div className="bb_table_td">17</div> <div className="bb_table_td">330k</div>{" "}
            <div className="bb_table_td">360k</div>{" "}
          </div>{" "}
          <div className="bb_table_tr">
            {" "}
            <div className="bb_table_td">18</div> <div className="bb_table_td">350k</div>{" "}
            <div className="bb_table_td">380k</div>{" "}
          </div>{" "}
          <div className="bb_table_tr">
            {" "}
            <div className="bb_table_td">19</div> <div className="bb_table_td">370k</div>{" "}
            <div className="bb_table_td">400k</div>{" "}
          </div>{" "}
          <div className="bb_table_tr">
            {" "}
            <div className="bb_table_td">20</div> <div className="bb_table_td">390k</div>{" "}
            <div className="bb_table_td">420k</div>{" "}
          </div>{" "}
          <div className="bb_table_tr">
            {" "}
            <div className="bb_table_td">21</div> <div className="bb_table_td">410k</div>{" "}
            <div className="bb_table_td">445k</div>{" "}
          </div>{" "}
          <div className="bb_table_tr">
            {" "}
            <div className="bb_table_td">22</div> <div className="bb_table_td">435k</div>{" "}
            <div className="bb_table_td">470k</div>{" "}
          </div>{" "}
          <div className="bb_table_tr">
            {" "}
            <div className="bb_table_td">23</div> <div className="bb_table_td">455k</div>{" "}
            <div className="bb_table_td">495k</div>{" "}
          </div>{" "}
          <div className="bb_table_tr">
            {" "}
            <div className="bb_table_td">24</div> <div className="bb_table_td">480k</div>{" "}
            <div className="bb_table_td">520k</div>{" "}
          </div>{" "}
          <div className="bb_table_tr">
            {" "}
            <div className="bb_table_td">25+</div> <div className="bb_table_td">605k</div>{" "}
            <div className="bb_table_td">655k</div>{" "}
          </div>
        </div>{" "}
      </fieldset>
    </div>
  );
}
