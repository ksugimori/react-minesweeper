import React from 'react';
import './MsCell.scss';

/**
 * props
 */
type Props = {
  count: number,
}

type State = {
  isOpen: boolean
}

/**
 * セル
 * @param props 
 * @returns セル
 */
export default class MsCell extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { isOpen: false };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState((state) => ({ isOpen: !state.isOpen }));
  }

  render() {
    const { count } = this.props;
    const { isOpen } = this.state;

    const classNameList = ['cell']
    isOpen && classNameList.push('cell-open')

    return (
      <div
        className={classNameList.join(' ')}
        onClick={this.onClick}
      >
        {isOpen && count > 0 ? count : ''}
      </div>
    );
  }
}
