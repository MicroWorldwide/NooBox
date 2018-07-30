import React from "react";
import styled from "styled-components";
import FAIcon from '@fortawesome/react-fontawesome';
import faSolid from '@fortawesome/fontawesome-free-solid';
import {Row,Col,Card, Icon,Popover, Avatar} from 'antd';
import {engineIcon} from "SRC/constant/settingMap.js";
import {dogeLoading} from "ASSET/funSh*t/dogeLoading.gif";
const ResultContainer = styled.div`
  background:white;
  border: 1px solid #e8e8e8;
  margin-top:20px;
  #dogeLoading{
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }
  .cardMetaWrapper{
    position: absolute;
    left: 4px;
    bottom: 6px;
  }
  .ant-card-body{
    padding: 0px;
  }
  .ant-avatar{
    opacity: 0.5
  }
  .ant-avatar:hover{
    opacity:0.8
    transition: opacity .25s ease-in-out;
  }

`;
const popoverContent ={
  maxWidth: "256px",
  margin:0,
}
export default class ImageWall extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      showModal:false,
      imageUrl:"",
    }
  }
  showModal(sourceUrl){
    this.setState({
      showModal:true,
      imageUrl:sourceUrl,
    })
  }
  hideModal(){
    this.setState({
      showModal:false,
    })
  }
  generateCardList(imageDataList){
    console.log(imageDataList);
    const eachRowNumber = 6;
    //span = 24/eachRow
    let count = 0;
    let eachRowCount = 0;
    let container  =[[],[],[],[],[],[]];
    while(count < imageDataList.length){
      while(count < imageDataList.length && eachRowCount < eachRowNumber){
        let item = imageDataList[count];
        let thatCol = container[eachRowCount];
        console.log(count);
        thatCol[thatCol.length]=(
          <div  key = {count} >
            <Popover  content ={<div style ={popoverContent}>
                                            <p>{item.imageInfo.width +"x" +item.imageInfo.height}</p>
                                            {item.description}
                                          </div>} 
                                 title ={<div style ={popoverContent}>
                                          <a target ="_blank" href = {item.sourceUrl}>{item.title}</a>
                                        </div>}>
            <Card
              hoverable = {true}
              style ={{ width: "100%",minHeight:60 }}
              // actions={[<FAIcon onClick={()=> this.showModal(item.imageUrl)}icon ={faSolid.faSearchPlus} />,
              //           <FAIcon icon ={faSolid.faDownload}/>]}
              cover ={<img alt="Image Is Dead, Sorry" src={item.thumbUrl} />}
            >
              <div className = "cardMetaWrapper">
                  <Card.Meta
                    avatar={<Avatar src={engineIcon[item["searchEngine"]]} />}
                    // title={<p>{item.imageInfo.width +"x" +item.imageInfo.height}</p>}
                  />
              </div>  
            </Card>
            </Popover>
          </div>
        )
        count ++;
        eachRowCount++;
      }
      eachRowCount = 0;
    }
    return container;
  }
  render(){
    let {imageDataList} = this.props;
    if(imageDataList.length> 0){
      let imageWall = this.generateCardList(imageDataList);
      return(
      <ResultContainer>
        <Row>
          {imageWall.map((item,index) =>{
              return (<Col key ={index} span ={4}>
                        {item}
                      </Col>)
            })}
        </Row> 
      </ResultContainer>
      );
    }else{
      return (
        <ResultContainer>
          <img id ="dogeLoading" src ="./static/funSh*t/dogeLoading.gif"/>
        </ResultContainer>
      );
    }
  }
}