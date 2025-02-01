import { css } from 'lit-element'
export default css`
.ui {
  height: 100vh;
  background-color: #02c39a;
  color: #eee;
  overflow-x:scroll;
  overflow-y:hidden; 
}

.header {
  margin-bottom: 10px;
  background-color: #028090;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.header .navbar {
  display: flex;
  align-items: center;
  justify-content: center;
}
.header .navbar.app {
  font-size: 21px;
  height: 46px;
  line-height: 46px;
}
.header .navbar.board {
  font-size: 1.1rem;
}
.available-boards {
  margin-top: 46px;
  text-align: center;
  padding-top: 12px;
  padding-bottom: 12px;
}

.available-boards ul {
  list-style: none;
  -webkit-box-align: center!important;
  -ms-flex-align: center!important;
  align-items: center!important;
  -webkit-box-pack: center!important;
  -ms-flex-pack: center!important;
  justify-content: center!important;
  display: -webkit-box!important;
  display: -ms-flexbox!important;
  display: flex!important;
  padding-left: 0;
}

.available-boards ul li {
  width: 100px;
  background-color: #264653;
  margin-right: 10px;
  cursor: pointer;
  height: 38px;
  line-height: 38px;
  font-size: 13px;
  position: relative;
}
.available-boards ul li:hover {
  background-color: #e76f51;
}

.available-boards ul li.selected {
  background-color: #e76f51;
}

.available-boards ul li.add-board svg{
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}


.lists {
  display: flex;
  align-items: flex-start;
}
.lists > * {
  flex: 0 0 auto;
  margin-left: 10px;
  background-color: #e2e4e6;
  border-radius: 5px;
}
.lists::after {
  content: "";
  flex: 0 0 10px;
}
`;