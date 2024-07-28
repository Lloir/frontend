import React, { useState } from 'react';
import { Tab, Nav, Row, Col } from 'react-bootstrap';
import PostList from './PostList';

const classes = {
    T1: ['Mage', 'Thief', 'Warrior'],
    T2: ['Archmage / Witch', 'Footsoldier', 'Frost Mage', 'Knight / Knightess', 'Legionnaire', 'Paladin / Valkyrie', 'Royal Guard', 'Rune Knight / Rune Knightess', 'Scorcher / Scorchess', 'Storm Knight / Storm Valkyrie', 'Strider', 'Wanderer / Wanderess', 'Warlock'],
    T3: ['Battle Master', 'Centurion', 'Conjuror / Conjuress', 'Court Mage', 'Handler', 'Phalanx', 'Shadowmaker', 'Sorcerer / Sorceress', 'Squire', 'Warlord'],
    T4: ['Augur', 'Gladiator', 'Lancer', 'Mystic', 'Runeblade', 'Spellsword', 'Wolf Tamer'],
    T5: ['Cavalry', 'Dragoon / Dragoness', 'Druid', 'Majestic', 'Spirit Tamer'],
    T6: ['Battlemage', 'Blademaster', 'Grand Mystic'],
    T7: ['Archdruid', 'Attuner', 'Dragon Knight', 'Majistrate'],
    T8: ['Arcanic', 'Atlas Vanguard', 'Freyr', 'Grand Attuner', 'Nekromancer', 'Pyromancer'],
    T9: ['Bahamut', 'Nyx', 'Omnimancer', 'Summoner', 'Titanguard'],
    T10: ['Beowulf', 'Gilgamesh', 'Heretic', 'Realmshifter', 'Grand Summoner'],
    Gods: ['Gaia', 'Ifrit', 'Leviathan', 'Taranis', 'Grand Ifrit', 'Great Leviathan', 'High Taranis', 'Noble Gaia', 'Deity']
};

const TierTabs = ({ posts }) => {
    const [activeKey, setActiveKey] = useState('T1');

    console.log('Rendering TierTabs with posts:', posts);

    return (
        <Tab.Container id="left-tabs-example" activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
            <Row>
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        {Object.keys(classes).map(tier => (
                            <Nav.Item key={tier}>
                                <Nav.Link eventKey={tier}>{tier}</Nav.Link>
                            </Nav.Item>
                        ))}
                    </Nav>
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                        {Object.entries(classes).map(([tier, tierClasses]) => (
                            <Tab.Pane eventKey={tier} key={tier}>
                                {tierClasses.map(postClass => (
                                    <div key={postClass}>
                                        <h3>{postClass}</h3>
                                        <PostList posts={posts.filter(post => post.class === postClass)} />
                                    </div>
                                ))}
                            </Tab.Pane>
                        ))}
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
};

export default TierTabs;
