import { Github } from 'styled-icons/boxicons-logos/Github';
import { Gitlab } from 'styled-icons/boxicons-logos/Gitlab';
import React from 'react';
import { Bacteria, Owl5 } from '../../components/icons';
import { Home } from './styles';

class HomeContainer extends React.Component {
  render() {
    return (
      <Home>
        <section className={'margin-top-l'}>
          <h2>postdoc</h2>
          <p className={'font-size-xs max-width-480'}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat.
          </p>
        </section>

        <section>
          <h4>Project Repositories</h4>
          <img src={Bacteria} />

          <div className={'project'}>
            <h6>Project Name</h6>
            <Github style={{width: 24}}/>
            <div className={'stats'}>
              pull requests
              issues
              contributors
              GitHub
            </div>
          </div>
          <div className={'project'}>
            <h6>Project Name</h6>
            <Github style={{width: 24}}/>
            <div className={'stats'}>
              pull requests
              issues
              contributors
              GitHub
            </div>
          </div>
          <div className={'project'}>
            <h6>Project Name</h6>
            <div className={'stats'}>
              pull requests
              issues
              contributors
              GitHub
            </div>
          </div>
          <div className={'project'}>
            <h6>Project Name</h6>
            <div className={'stats'}>
              pull requests
              issues
              contributors
              GitHub
            </div>
          </div>
        </section>

        <section className={'credits'}>
          Credits

          <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"     title="Flaticon">www.flaticon.com</a></div><div>Icons made by <a href="https://www.flaticon.com/authors/turkkub" title="turkkub">turkkub</a> from <a href="https://www.flaticon.com/"     title="Flaticon">www.flaticon.com</a></div><div>Icons made by <a href="https://www.flaticon.com/authors/wanicon" title="wanicon">wanicon</a> from <a href="https://www.flaticon.com/"     title="Flaticon">www.flaticon.com</a></div>
        </section>
      </Home>
    );
  }
}

export default HomeContainer;
