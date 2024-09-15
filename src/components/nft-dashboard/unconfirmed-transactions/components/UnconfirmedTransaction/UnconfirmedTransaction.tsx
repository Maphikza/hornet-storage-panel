import React, { useState } from 'react';
import * as S from './UnconfirmedTransaction.styles';
import { BaseCard } from '@app/components/common/BaseCard/BaseCard';
import { useResponsive } from '@app/hooks/useResponsive';
import { truncateString } from '@app/utils/utils';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Button, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
interface UnconfirmedTransactionProps {
  tx_id: string;
  date_created: string;
  amount: string;
  feeAmount?: string;
}

const UnconfirmedTransaction: React.FC<UnconfirmedTransactionProps> = ({ tx_id, date_created, amount, feeAmount }) => {
  const { isTablet } = useResponsive();
  const [messageApi, contextHolder] = message.useMessage();
  const copied = () => {
    messageApi.open({ content: 'Copied to clipboard', duration: 1, type: 'success' });
  };
  const onCopy = () => {
    //display Copied to clipboard
    copied();
  };
  return (
    <S.TransactionWrapper>
      {contextHolder}
      <S.IDWrapper $isMobile={!isTablet}>
        <S.Value>
          {!isTablet ? truncateString(tx_id, 20) : truncateString(tx_id, 35)}
          <S.CopyWrapper>
            <CopyToClipboard text={tx_id}>
              <Button onClick={onCopy} icon={<CopyOutlined />} size="small" />
            </CopyToClipboard>
          </S.CopyWrapper>
        </S.Value>

        <S.Label>Transaction ID</S.Label>
      </S.IDWrapper>
      <S.DataWrapper>
        <S.Value>{date_created}</S.Value>
        <S.Label>Date Created</S.Label>
      </S.DataWrapper>
      <S.DataWrapper>
        <S.Value>{amount}</S.Value>
        <S.Label>Amount</S.Label>
      </S.DataWrapper>
    </S.TransactionWrapper>
  );
};

export default UnconfirmedTransaction;
