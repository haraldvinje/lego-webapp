// @flow

import React, { Component } from 'react';
import { Link } from 'react-router';
import Button from 'app/components/Button';
import styles from './Toolbar.css';
import Icon from 'app/components/Icon';

class Toolbar extends Component {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.section}>
          <h2> Dine Møter </h2>
        </div>

        <div className={styles.section}>
          <Link to='/meetings/create/'>
            <Button>
              <Icon name='plus' />
              Nytt møte
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Toolbar;