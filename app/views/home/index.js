import { Github } from 'styled-icons/boxicons-logos/Github';
import { Gitlab } from 'styled-icons/boxicons-logos/Gitlab';
import React from 'react';
import { Bacteria, Owl5 } from '../../components/branding';
import { FlexColumn, FlexRow } from '../../components/layout';
import { Card, Home } from './styles';

class HomeContainer extends React.Component {
  render() {
    return (
      <Home>
        <FlexRow alignItems={'stretch'} justifyContent={'space-between'}>
          <FlexColumn style={{ flexBasis: '50%' }}>
            <section>
              <h4>Project Repositories</h4>

              <Card>
                <h6>Project Name</h6>
                <Github style={{ width: 24 }} />
                <div className={'stats'}>
                  pull requests issues contributors GitHub
                </div>
              </Card>
              <Card>
                <h6>Project Name</h6>
                <Github style={{ width: 24 }} />
                <div className={'stats'}>
                  pull requests issues contributors GitHub
                </div>
              </Card>
              <Card>
                <h6>Project Name</h6>
                <div className={'stats'}>
                  pull requests issues contributors GitHub
                </div>
              </Card>
              <Card>
                <h6>Project Name</h6>
                <div className={'stats'}>
                  pull requests issues contributors GitHub
                </div>
              </Card>
            </section>
          </FlexColumn>
          <FlexColumn style={{ flexBasis: '50%' }}>
            <FlexRow alignItems={'center'} justifyContent={'center'}>
              <img src={Owl5} style={{ maxWidth: 320 }} />
            </FlexRow>
            <section className={'margin-top-l'}>
              <h1 className={'brand'}>postdoc</h1>
              <p className={'max-width-480'}>For help, please visit:</p>
              <ul>
                <li>
                  the postdoc{' '}
                  <a href="https://google.com" target={'_blank'}>
                    Help and API documentation
                  </a>
                </li>
                <li>the postdoc chat room on postdoc.gitter.com</li>
                <li>
                  postdoc.org web site, where you can search for plugins and
                  developer documentation
                </li>
              </ul>
              <div>Show welcome guide when opening postdoc</div>

              <div className={'monospace'}>Version 0.0.1</div>
              <p>
                Icons by
                <a
                  href="https://www.flaticon.com/authors/freepik"
                  title="Freepik"
                >
                  Freepik
                </a>
                ,
                <a
                  href="https://www.flaticon.com/authors/turkkub"
                  title="turkkub"
                >
                  turkkub
                </a>
                , and
                <a
                  href="https://www.flaticon.com/authors/wanicon"
                  title="wanicon"
                >
                  wanicon
                </a>
              </p>
            </section>
          </FlexColumn>
        </FlexRow>
      </Home>
    );
  }
}

export default HomeContainer;
