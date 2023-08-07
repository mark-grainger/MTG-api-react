import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import "../App.css";

const title = 'MTG Card List App';
// const App = ({title}) => (
//    <div className="header">{title}</div>
// );
// API to use for demo https://api.scryfall.com/cards/search?q=c%3Awhite+cmc%3D1+set%3ABRO

const CardList = (props) => (
    <div>
        <Card />
    </div>
)

class Card extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          file: 'placeholder',
          display: 'none',
          key: [],
          modalkey: [],
          mtgData: [],
          color: 'g',
          colorModifier: '=',
          iscmc: '+cmc',
          cmc: '1',
          cmcModifier: '=',
          name: '',
          isset: '+set',
          set: 'LTR',
          setmodifier: ':',
          setname: 'Lord of the Rings: Tales of Middle Earth',
          isactivebtncolor: 'cc-fb-g',
          isactivebtncmc: 'cmc-fb-1',
          isactivebtnset: 'set-fb-0',
          trycatchstatus: 'pass',
          dfc : 'false',
          cardheight : '750px',
          carddivkey : '',
        }
      }
      async componentDidMount() {
        let fetchAPIUri = '';
            fetchAPIUri = 'https://api.scryfall.com/cards/search?order=set&q=color' + this.state.colorModifier + this.state.color + this.state.iscmc + this.state.cmcModifier + this.state.cmc + this.state.isset + this.state.setmodifier + this.state.set;
        try {
          const response = await fetch(fetchAPIUri);
          if (!response.ok) {
            this.setState({ trycatchstatus : 'fail' }, console.log('error: fetchapiURL: ' + fetchAPIUri));
            throw Error(response.statusText);
          } else if(response.status === 404) {
            this.setState({ trycatchstatus : 'fail' }, console.log('error: fetchapiURL: ' + fetchAPIUri));
            throw Error('No Results Found');
          } else {
            const mtgJson = await response.json();
            this.setState({ mtgData: mtgJson.data, trycatchstatus: 'pass' }, console.log('fetchapiURL: ' + fetchAPIUri));
          }
        } catch (error) {
          console.log('error: ' + error);
          this.setState({ trycatchstatus: 'fail' }, console.log('error: fetchapiURL: ' + fetchAPIUri))
        }
    }
    componentWillUnmount() {
        // make fetch request
    }
    render() {
        const Image = (props) => {
            return (
                <img src={props.src} alt={props.alt} style={props.style}/>
            )
        }
        let errorText = '';
        const updateFetch = async() => {
            document.getElementById('errorDiv').style.display = 'none';
            let fetchAPIUri = 'https://api.scryfall.com/cards/search?order=set&q=color' + this.state.colorModifier + this.state.color + this.state.iscmc + this.state.cmcModifier + this.state.cmc + this.state.isset + this.state.setmodifier+ this.state.set;
            try {
              const response = await fetch(fetchAPIUri);
              if (!response.ok) {
                this.setState({ trycatchstatus : 'fail' }, console.log('error: fetchapiURL: ' + fetchAPIUri) );
                throw Error(response.statusText);
              } else if(response.status === 404) {
                this.setState({ trycatchstatus : 'fail' }, console.log('error: fetchapiURL: ' + fetchAPIUri));
                throw Error('No Results Found');
              } else {
                const mtgJson = await response.json();
                this.setState({ mtgData: mtgJson.data, trycatchstatus: 'pass' }, console.log('fetchapiURL: ' + fetchAPIUri));
              }
            } catch (error) {
              console.log('caught error: ' + error);
              if (error instanceof SyntaxError || error instanceof Error) {
                this.setState({ 
                    mtgData: [],
                    trycatchstatus: 'fail',
                }, () => { document.getElementById('errorDiv').style.display = 'block' }, console.log('error: fetchapiURL: ' + fetchAPIUri))
              }
            }
        }
        const CheckModalCard = (display, file, key, name) => {
            const currDisplay = display === 'none' ? 'block' : 'none';
            this.setState({
                file: file,
                display: currDisplay,
                key: key,
                modalkey: 'modal_' + key,
                name: name,
            }, () => {console.log('modal_key: ' + this.state.modalkey + ' this.state.display: ' + this.state.display + ' getElement=' + document.getElementById(this.state.modalkey));document.getElementById(this.state.modalkey).style.display = this.state.display;});            
            
            return (
                currDisplay
            )
        }
        const ModalCard = (props) => {
            return (
                <div 
                    id={props.id} 
                    style={
                        {position: 'fixed', 
                        top: '0', 
                        width:'100%', 
                        textAlign: 'center',
                        height:'950px', 
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        padding: '10px',
                        display: this.state.display}
                    } 
                    onClick={
                        () => { 
                            this.setState({ 
                                file: 'placeholder', 
                                display: CheckModalCard(this.state.display, this.state.file, this.state.key, this.state.name), 
                                key:'0'                            
                            });
                        }
                    }>
                    <Image 
                        src={props.file} 
                        alt={props.file}
                        style={
                            {
                                height: '900px',
                                width: 'auto',
                            }
                        }  
                    />
                </div>
            )
        }
        const hrefStyle = `.card_gatherer_link a, card_gatherer_link a:visited { color: #33C; text-decoration: underline; font-size: small;} .card_gatherer_link a:hover { color: #3C3; text-decoration: none; } .is_active_btn {background-color: #33CC33;} .is_active_btn:hover, .is_inactive_btn:hover { background-color: #999; } .is_inactive_btn { background-color: #fff; }`
        const HoverClass = (props) => {
            return (
                <a 
                    href={props.href}
                    target={props.target}
                    >
                    {props.linktext}
                </a>
            )
        }
        const colorClick = (color, colorModifier, listkey) => {
            this.setState(
                {
                    color: color,
                    colorModifier: colorModifier,
                    isactivebtncolor: listkey,
                }, 
                () => updateFetch()
            )
        }
        const cmcClick = (iscmc, cmc, cmcModifier, listkey) => {
            this.setState(
                {
                    iscmc: iscmc,
                    cmc: cmc,
                    cmcModifier: cmcModifier,
                    isactivebtncmc: listkey,
                }, 
                () => updateFetch()
            )
        }
        const setClick = (isset, set, setmodifier, setname, listkey) => {
            this.setState(
                {
                    isset: isset,
                    set: set,
                    setmodifier: setmodifier,
                    setname: setname,
                    isactivebtnset: listkey,
                }, 
                () => updateFetch()
            )
        }
        const FilterCCButton = (props) => {
            return (
                <button key={props.listkey} onClick={()=>colorClick(props.prop1,props.prop2,props.listkey)} style={{border: '1px solid #000', borderRadius: '5px', cursor: 'pointer'}} className={props.listkey===this.state.isactivebtncolor ? 'is_active_btn' : 'is_inactive_btn'}>{props.label}</button>
            )
        }
        const FilterCMCButton = (props) => {
            return (
                <button key={props.listkey} onClick={()=>cmcClick(props.prop1,props.prop2,props.prop3,props.listkey)} style={{border: '1px solid #000', borderRadius: '5px', cursor: 'pointer'}} className={props.listkey===this.state.isactivebtncmc ? 'is_active_btn' : 'is_inactive_btn'}>{props.label}</button>
            )
        }
        const FilterSETButton = (props) => {
            return (
                <button key={props.listkey} onClick={()=>setClick(props.prop1,props.prop2,props.prop3,props.label,props.listkey)} style={{border: '1px solid #000', borderRadius: '5px', cursor: 'pointer'}} className={props.listkey===this.state.isactivebtnset ? 'is_active_btn' : 'is_inactive_btn'}>{props.label}</button>
            )
        }
        return (            
            <div>
                <style>{hrefStyle}</style>
                <div style={{float: 'left', maxWidth: '450px', width: '100%', textAlign: 'center', margin: '30px'}}>
                    <h4 style={{display: 'block', margin: '15px'}}>Card Colour</h4>
                    <FilterCCButton listkey='cc-fb-g' label='Green' prop1='g' prop2='=' />
                    <FilterCCButton listkey='cc-fb-r' label='Red' prop1='r' prop2='=' />
                    <FilterCCButton listkey='cc-fb-u' label='Blue' prop1='u' prop2='=' />
                    <FilterCCButton listkey='cc-fb-b' label='Black' prop1='b' prop2='=' />
                    <FilterCCButton listkey='cc-fb-w' label='White' prop1='w' prop2='='  />
                    <FilterCCButton listkey='cc-fb-c' label='Colourless' prop1='c' prop2='=' />
                    <FilterCCButton listkey='cc-fb-grubw' label='Multicolour' prop1='WUBRG' prop2='>=' />
                    <FilterCCButton listkey='cc-fb-grubwc' label='Any' prop1='WUBRGC' prop2='<=' />                    
                </div>
                <div style={{float: 'left', maxWidth: '450px', width: '100%', textAlign: 'center', margin: '30px'}}>
                <h4 style={{display: 'block', margin: '15px'}}>CMC</h4>
                    <FilterCMCButton prop1='+cmc' prop2='0' prop3='=' listkey='cmc-fb-0' label='0' />
                    <FilterCMCButton prop1='+cmc' prop2='1' prop3='=' listkey='cmc-fb-1' label='1' />
                    <FilterCMCButton prop1='+cmc' prop2='2' prop3='=' listkey='cmc-fb-2' label='2' />
                    <FilterCMCButton prop1='+cmc' prop2='3' prop3='=' listkey='cmc-fb-3' label='3' />
                    <FilterCMCButton prop1='+cmc' prop2='4' prop3='=' listkey='cmc-fb-4' label='4' />
                    <FilterCMCButton prop1='+cmc' prop2='5' prop3='=' listkey='cmc-fb-5' label='5' />
                    <FilterCMCButton prop1='+cmc' prop2='6' prop3='=' listkey='cmc-fb-6' label='6' />
                    <FilterCMCButton prop1='+cmc' prop2='7+' prop3='>=' listkey='cmc-fb-7' label='7+' />
                    <FilterCMCButton prop1='' prop2='' prop3='' listkey='cmc-fb-8' label='any' />
                </div>
                <div style={{float: 'left', maxWidth: '450px', width: '100%', textAlign: 'center', margin: '30px'}}>
                <h4 style={{display: 'block', margin: '15px'}}>SET</h4>
                    <FilterSETButton prop1='' prop2='' prop3='' listkey='set-fb-10' label="All" />
                    <FilterSETButton prop1='+set' prop2='LTR' prop3=':' listkey='set-fb-0' label="Lord of the Rings: Tales of Middle Earth" />
                    <FilterSETButton prop1='+set' prop2='MAT' prop3=':' listkey='set-fb-1' label="March of the Machines: The Aftermath" />
                    <FilterSETButton prop1='+set' prop2='MOM' prop3=':' listkey='set-fb-2' label="March of the Machines" />
                    <FilterSETButton prop1='+set' prop2='BRO' prop3=':' listkey='set-fb-3' label="The Brothers' War" />
                    <FilterSETButton prop1='+set' prop2='DMU' prop3=':' listkey='set-fb-4' label="Dominaria United" />
                    <FilterSETButton prop1='+set' prop2='SNC' prop3=':' listkey='set-fb-5' label="Streets of New Capenna" />
                    <FilterSETButton prop1='+set' prop2='NEO' prop3=':' listkey='set-fb-6' label="Kamigawa: Neon Dynasty" />
                    <FilterSETButton prop1='+set' prop2='VOW' prop3=':' listkey='set-fb-7' label="Innistrad: Crimson Vow" />
                    <FilterSETButton prop1='+set' prop2='MID' prop3=':' listkey='set-fb-8' label="Innistrad: Midnight Hunt" />
                    <FilterSETButton prop1='+set' prop2='AFR' prop3=':' listkey='set-fb-9' label="Dungeons & Dragons: Adventures in the Forgotten Realms" />                    
                </div>
                <div style={{clear: 'both'}}></div>
                <div className='errorDiv' id='errorDiv' style={{display: 'none'}}>There were no results to display to display for <br /> Color {this.state.colorModifier} {this.state.color} and CMC {this.state.cmcModifier} {this.state.cmc} for the {this.state.setname} set.</div>
                { 
                    this.state.trycatchstatus === 'pass' ?
                    this.state.mtgData.map((card, index) => {
                    let cardLegalities = card.legalities;
                    let cardLegality = Object.keys(cardLegalities);
                    return (      
                        <div 
                            className="mtg-card" 
                            id={'div_' + card.arena_id} 
                            ref={'div_' + card.arena_id} 
                            key={card.name + card.arena_id + index}
                            style={
                                {  
                                    margin: '10px', 
                                    border: '1px solid #000', 
                                    padding: '10px', 
                                    backgroundColor: '#fff', 
                                    maxWidth:'300px', 
                                    width:'100%', 
                                    minHeight: this.state.cardheight, 
                                    textAlign: 'left', 
                                    float: 'left', 
                                    display: 'inline-block', 
                                    borderRadius: '5px',
                                }
                            }
                        >
                        <img 
                            src={ typeof card.card_faces === 'undefined' ? card.image_uris.png : typeof card.card_faces[1].image_uris === 'undefined' ? card.image_uris.png : card.card_faces[1].image_uris.png } 
                            style={ typeof card.card_faces === 'undefined' ? { height: '120px', 
                                width: '85px', 
                                margin: '10px', 
                                marginTop: '0', 
                                marginLeft: '-10px',
                                float: 'right', 
                                display: 'none'} : typeof card.card_faces[1].image_uris === 'undefined' ? { height: '120px', 
                                    width: '85px', 
                                    margin: '10px', 
                                    marginTop: '0', 
                                    marginLeft: '-10px',
                                    float: 'right', 
                                    display: 'none'} : { height: '120px', 
                                        width: '85px', 
                                        margin: '10px', 
                                        marginTop: '0', 
                                        marginLeft: '-10px',
                                        float: 'right', 
                                        display: 'block'}
                                } 
                            id={ 'secondimg_' + card.arena_id }
                            onClick={()=> {
                                CheckModalCard(this.state.display, typeof card.card_faces === 'undefined' ? card.image_uris.png : typeof card.card_faces[1].image_uris === 'undefined' ? card.image_uris.png : card.card_faces[1].image_uris.png, card.arena_id, card.name);
                            }} />
                            <img 
                                src={ typeof card.card_faces === 'undefined' ? card.image_uris.png : typeof card.card_faces[0].image_uris === 'undefined' ? card.image_uris.png : card.card_faces[0].image_uris.png } 
                                style={
                                    {
                                        height: '120px', 
                                        width: '85px', 
                                        margin: '10px', 
                                        marginTop: '0', 
                                        float: 'right'}
                                } 
                            id={ 'img_' + card.arena_id }
                            onClick={()=> {
                                CheckModalCard(this.state.display, typeof card.card_faces === 'undefined' ? card.image_uris.png : typeof card.card_faces[0].image_uris === 'undefined' ? card.image_uris.png : card.card_faces[0].image_uris.png, card.arena_id, card.name);
                            }} />
                            <div className="card_info">
                                <div className='card_header'>
                                    <div 
                                        className='card_cost' 
                                        style={
                                            {
                                                color:'#000', 
                                                fontSize: 'x-small', 
                                                padding: '5px', 
                                                maxWidth: '75px', 
                                                width: '100%', 
                                                float: 'right', 
                                                display: 'inline-block'
                                            }
                                    }>
                                        {card.mana_cost}
                                    </div>
                                    <div 
                                        className='card_name' 
                                        style={
                                            {
                                                color:'#000', 
                                                fontSize: 'small', 
                                                marginBottom: '5px'
                                            }
                                        }>
                                            {card.name}
                                    </div>
                                </div>
                                <div 
                                    className='card_types' 
                                    style={
                                        {
                                            color:'#000', 
                                            fontSize: 'small', 
                                            marginBottom: '5px'
                                        }
                                    }>
                                        {card.type_line}
                                </div>
                                <div 
                                    className='card_text' 
                                    style={
                                        {
                                            color:'#000', 
                                            fontSize: 'small', 
                                            marginBottom: '5px'
                                        }
                                }>
                                    {card.oracle_text}
                                </div>
                                <div 
                                    className='card_flavour_text' 
                                    style={
                                        {
                                            color:'#666', 
                                            fontSize: 'x-small', 
                                            marginBottom: '5px', 
                                            fontStyle: 'italic', 
                                            clear: 'both'
                                        }
                                    }>
                                        {card.flavor_text}
                                </div>
                                <div 
                                    className='card_legality' 
                                    style={
                                        {
                                            color:'#000', 
                                            fontSize: 'small', 
                                            marginBottom: '5px'
                                        }
                                }>
                                    { cardLegality.map((key, index) => {
                                    return ( 
                                        <li 
                                            style={{listStyle: 'none'}} 
                                            key={[key, cardLegalities[key]]}>
                                            {key}: {cardLegalities[key]}
                                        </li>)
                                    })}
                                </div>
                                <div 
                                    className='card_meta_footer' 
                                    style={
                                        {
                                            color:'#000', 
                                            fontSize: '0.4em',  
                                            textAlign:'right'
                                        }
                                }>
                                <div 
                                    style={
                                        {
                                            display: 'inline-block', 
                                            padding: '5px'
                                        }
                                    } 
                                    className='card_artist'
                                >
                                    Art: {card.artist}
                                </div>
                                <div 
                                    className='card_set' 
                                    style={
                                        {
                                            display: 'inline-block', 
                                            padding: '5px'
                                        }
                                    }
                                >
                                    {card.set_name}
                                </div>
                                <div 
                                    style={
                                        {
                                            display: 'inline-block', 
                                            padding: '5px'
                                        }
                                    } 
                                    className='card_rarity'
                                >
                                    {card.rarity}
                                </div>
                                <div 
                                    style={
                                        {
                                            display: 'inline-block', 
                                            padding: '5px'
                                        }
                                    } 
                                    className='card_set_number'>
                                    {card.collector_number}
                                </div>
                            </div>
                            <div className='card_gatherer_link'>
                                <HoverClass 
                                    className='gatherer_link'
                                    id={'gatherer_link' + index} 
                                    href={card.related_uris.gatherer} 
                                    target='_blank' 
                                    linktext='View on Gatherer' />
                            </div>
                        </div>
                    </div>
                )}) : () => { return <div></div> }
            }
            <ModalCard 
                display={this.state.display}
                file={this.state.file}
                name={this.state.name} 
                id={this.state.modalkey} />                                
        </div>
        );
    }
}
class App extends React.Component {
    render() {
        const numCollection = [...Array(20).keys()];
        return (
            <div style={{width: '100%'}}>
                <div className="header">{this.props.title}</div>
                <CardList />
            </div>
        ); 
    }
}
// {numCollection.map(number => (
//    <Card number={number + 1} />
//    ))}
export default App;
