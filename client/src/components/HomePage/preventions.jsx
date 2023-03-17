import React, { Component } from "react";
import { Container } from "reactstrap";
import { Grid, Cell, List, ListItem } from "react-mdl";
import End from "./sub-com/end";
import "./css/Preventions.css";
import Carousel from "./sub-com/carousel";
import Cone from "./img/pr1.png";
import Ctwo from "./img/pr2.png";
import Cthree from "./img/pr3.png";
import "./css/header.css";
import Navbar from "./Navbar";
import { Tabs, Tab } from "react-mdl";
class preventions extends Component {
  state = { tabNum: 0 };

  changeTab() {
    if (this.state.tabNum === 0) {
      return (
        <h4>
          You can reduce your chances of being infected or spreading COVID-19 by
          taking some simple precautions: Regularly and thoroughly clean your
          hands with an alcohol-based hand rub or wash them with soap and water.
          Why? Washing your hands with soap and water or using alcohol-based
          hand rub kills viruses that may be on your hands. Maintain at least 1
          metre (3 feet) distance between yourself and others. Why? When someone
          coughs, sneezes, or speaks they spray small liquid droplets from their
          nose or mouth which may contain virus. If you are too close, you can
          breathe in the droplets, including the COVID-19 virus if the person
          has the disease. Avoid going to crowded places. Why? Where people come
          together in crowds, you are more likely to come into close contact
          with someone that has COIVD-19 and it is more difficult to maintain
          physical distance of 1 metre (3 feet). Avoid touching eyes, nose and
          mouth. Why? Hands touch many surfaces and can pick up viruses. Once
          contaminated, hands can transfer the virus to your eyes, nose or
          mouth. From there, the virus can enter your body and infect you. Make
          sure you, and the people around you, follow good respiratory hygiene.
          This means covering your mouth and nose with your bent elbow or tissue
          when you cough or sneeze. Then dispose of the used tissue immediately
          and wash your hands. Why? Droplets spread virus. By following good
          respiratory hygiene, you protect the people around you from viruses
          such as cold, flu and COVID-19. Stay home and self-isolate even with
          minor symptoms such as cough, headache, mild fever, until you recover.
          Have someone bring you supplies. If you need to leave your house, wear
          a mask to avoid infecting others. Why? Avoiding contact with others
          will protect them from possible COVID-19 and other viruses. If you
          have a fever, cough and difficulty breathing, seek medical attention,
          but call by telephone in advance if possible and follow the directions
          of your local health authority. Why? National and local authorities
          will have the most up to date information on the situation in your
          area. Calling in advance will allow your health care provider to
          quickly direct you to the right health facility. This will also
          protect you and help prevent spread of viruses and other infections.
          Keep up to date on the latest information from trusted sources, such
          as WHO or your local and national health authorities. Why? Local and
          national authorities are best placed to advise on what people in your
          area should be doing to protect themselves.
        </h4>
      );
    } else if (this.state.tabNum === 1) {
      return (
        <div className="infolist">
          <List>
            <ListItem>
              Wash your hands often
              <i className="fa fa-check-square-o" aria-hidden="true"></i>
            </ListItem>

            <ListItem>
              Avoid close contact
              <i className="fa fa-check-square-o" aria-hidden="true"></i>
            </ListItem>

            <ListItem>
              Cover your mouth and nose with a cloth face cover when around
              others
              <i className="fa fa-check-square-o" aria-hidden="true"></i>
            </ListItem>

            <ListItem>
              Cover coughs and sneezes
              <i className="fa fa-check-square-o" aria-hidden="true"></i>
            </ListItem>
            <ListItem>
              Clean and disinfect
              <i className="fa fa-check-square-o" aria-hidden="true"></i>
            </ListItem>
          </List>
        </div>
      );
    } else if (this.state.tabNum === 2) {
      return (
        <div className="infolist">
          <List>
            <ListItem>
              have not been diagnosed with COVID-19
              <i className="fa fa-thumbs-up" aria-hidden="true"></i>
            </ListItem>

            <ListItem>
              do not have symptoms of COVID-19
              <i className="fa fa-thumbs-up" aria-hidden="true"></i>
            </ListItem>

            <ListItem>
              have not travelled outside of Canada in the past 14 days
              <i className="fa fa-thumbs-up" aria-hidden="true"></i>
            </ListItem>

            <ListItem>
              are not in quarantine (self-isolating)
              <i className="fa fa-thumbs-up" aria-hidden="true"></i>
            </ListItem>
            <ListItem>
              are not isolating
              <i className="fa fa-thumbs-up" aria-hidden="true"></i>
            </ListItem>
          </List>
        </div>
      );
    } else if (this.state.tabNum === 3) {
      return (
        <div className="infolist">
          <List>
            <ListItem>
              toilets
              <i className="fa fa-shower" aria-hidden="true"></i>
            </ListItem>

            <ListItem>
              phones
              <i className="fa fa-shower" aria-hidden="true"></i>
            </ListItem>

            <ListItem>
              electronics
              <i className="fa fa-shower" aria-hidden="true"></i>
            </ListItem>

            <ListItem>
              door handles
              <i className="fa fa-shower" aria-hidden="true"></i>
            </ListItem>

            <ListItem>
              bedside tables
              <i className="fa fa-shower" aria-hidden="true"></i>
            </ListItem>

            <ListItem>
              television remotes
              <i className="fa fa-shower" aria-hidden="true"></i>
            </ListItem>
          </List>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="headerbg">
        <Navbar />
        <Grid>
          <Cell col={12}>
            <Container>
              <div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <h1 className="title">
                  Coronavirus disease (COVID-19) advice for the public
                </h1>
                <p className="w">
                  Information comes from World Health Organization.
                </p>
                <hr />
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
              </div>
            </Container>
          </Cell>
          <Cell col={6}>
            <Carousel c1={Cone} c2={Ctwo} c3={Cthree} />
          </Cell>
          <Cell col={6}>
            <div className="infogrid">
              <Tabs
                onChange={(tabId) => this.setState({ tabNum: tabId })}
                ripple
              >
                <Tab>Protect yourself</Tab>
                <Tab>You should</Tab>
                <Tab>Go for a walk if</Tab>
                <Tab>Cleaning</Tab>
              </Tabs>
              <section>
                <div className="content">{this.changeTab()}</div>
              </section>
            </div>
          </Cell>
          <Cell col={12}>
            {" "}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <End />
          </Cell>
        </Grid>
      </div>
    );
  }
}

export default preventions;
