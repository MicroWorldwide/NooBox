import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputNumber, Progress } from 'antd';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import styled from 'styled-components';
import { getActiveTab } from '../../utils/getActiveTab';
import { getI18nMessage } from '../../utils/getI18nMessage';
import { AutoRefreshStore } from '../stores/autoRefreshStore';

interface IAutoRefreshInjectedProps {
  autoRefreshStore: AutoRefreshStore;
}

interface IAutoRefreshDivProps {
  active: boolean;
}

const AutoRefreshDiv = styled.div`
  #autoRefreshHeader {
    font-size: 16px;
    margin: 0 0 4px;
    color: rgba(0, 0, 0, 0.85);
  }
  .ant-progress-bg {
    height: 2px !important;
    position: absolute;
    top: -13px;
    left: 0;
  }
  .ant-input-number {
    border-radius: 0;
  }
  #refreshToggle {
    cursor: pointer;
    color: ${(p: IAutoRefreshDivProps) => (p.active ? '#40a9ff' : '#495056')};
  }
`;

@inject('autoRefreshStore')
@observer
export class AutoRefresh extends React.Component {
  get injected() {
    return (this.props as any) as IAutoRefreshInjectedProps;
  }

  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    const { autoRefreshStore } = this.injected;
    autoRefreshStore.getCurrentTabStatus().catch(console.error);
  }

  public render() {
    const { autoRefreshStore } = this.injected;
    const { elapsedTime, active, interval } = autoRefreshStore;
    return (
      <AutoRefreshDiv active={active}>
        <Progress percent={(elapsedTime / interval) * 100} showInfo={false} />
        <p id='autoRefreshHeader'>{getI18nMessage('auto_refresh')}</p>
        <span
          id='refreshToggle'
          onClick={async () =>
            autoRefreshStore.updateAutoRefresh({
              active: !active,
              tabId: (await getActiveTab())!.id!
            })
          }>
          <FontAwesomeIcon icon='sync' spin={active} />
        </span>
        <InputNumber
          value={interval / 1000}
          min={1}
          formatter={(value) => `${value}${getI18nMessage('s')}`}
          parser={(value) => value!.replace(getI18nMessage('s'), '')}
          onChange={async (value) =>
            autoRefreshStore.updateAutoRefresh({
              active,
              interval: value! * 1000,
              tabId: (await getActiveTab())!.id!
            })
          }
        />
      </AutoRefreshDiv>
    );
  }
}
