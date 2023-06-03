import { Execution } from '@prisma/client';
import axios from 'axios';
import { Contract, utils } from 'near-api-js';
import { parseNearAmount } from 'near-api-js/lib/utils/format';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useNear from 'src/hook/useNear';
import { CONTRACT_ID } from 'src/utils/contract';

function Admin() {
  const { id } = useRouter().query;
  const router = useRouter();
  const { account, accountId } = useNear();

  const updateSetting = async () => {
    if (!account) return;
    const contract: any = new Contract(account, CONTRACT_ID, {
      changeMethods: ['setting'],
      viewMethods: ['get_challenge_info'],
      // viewMethods: ['get_participants'],
    });
    // const res = await contract.get_participants({ challenge_id: Number(id) });
    const res = await contract.get_challenge_info({ challenge_id: Number(id) });
    console.log('res', res);
    const receipt = await contract.setting({
      moderator_require_amount: 100,
      platform_fee: 10,
    });
    console.log('receipt', receipt);
  };

  const challengeSetting = async () => {
    if (!account) return;
    console.log(id);
    const contract: any = new Contract(account, CONTRACT_ID, {
      changeMethods: ['challenge_setting'],
      viewMethods: [],
    });
    // const max_betting_price = 100;
    const max_betting_price = 100;
    const min_betting_price = 10;
    // const min_betting_price = utils.format.parseNearAmount('1');
    const max_participants = 100;
    const failers_retrieve_ratio = 50;
    const success_condition = 1;
    const draw_condition = 1;
    const start_time = 1684549095000;
    const end_time = 1884549095000;
    const challenge_info = {
      max_betting_price,
      min_betting_price,
      max_participants,
      failers_retrieve_ratio,
      success_condition,
      draw_condition,
      start_time,
      end_time,
    };
    // const receipt = await contract.challenge_setting({
    //   challenge_id: id,
    //   challenge_info,
    // });
    const receipt = await contract.challenge_setting({
      challenge_id: Number(id),
      challenge_info: {
        max_betting_price: 100,
        min_betting_price: 10,
        max_participants,
        failers_retrieve_ratio,
        success_condition,
        draw_condition,
        start_time,
        end_time,
      },
    });
    alert('finish');
  };

  const addModerator = async () => {
    if (!id) return;
    const contract: any = new Contract(account, CONTRACT_ID, {
      changeMethods: ['add_moderator'],
      viewMethods: [],
    });
    await contract.add_moderator({
      moderator: accountId,
    });
    alert('finish');
  };

  const verify = async () => {
    if (!id) return;
    const res: Execution[] = (
      await axios.get('/api/execution/get-verified-excution', {
        params: {
          challengeId: id,
        },
      })
    ).data;
    let arr = [];
    for (let i = 0; i < res.length; i++) {
      // if (res[i].status === 'rejected') return;
      arr.push({
        challenge_id: Number(id),
        user: res[i].account,
        index: res[i].count,
      });
    }
    const contract: any = new Contract(account, CONTRACT_ID, {
      changeMethods: ['verify'],
      viewMethods: [],
    });
    arr = [
      {
        challenge_id: 1,
        user: accountId,
        index: 1,
      },
    ];
    await contract.verify({ moderator: accountId, verify_units: arr });
    alert('finish');
  };

  const settle = async () => {
    if (!id) return;
    const contract: any = new Contract(account, CONTRACT_ID, {
      changeMethods: ['settle_winner'],
      viewMethods: [],
    });
    await contract.settle_winner({ challenge_id: Number(id) });
    alert('finish');
  };

  return (
    <div>
      <br />
      <br />
      <button onClick={updateSetting} style={{ background: 'blue' }}>
        updateSetting
      </button>
      <br />
      <br />
      <button onClick={challengeSetting} style={{ background: 'blue' }}>
        challengeSetting
      </button>
      <br />
      <br />
      <br />
      <button onClick={addModerator} style={{ background: 'blue' }}>
        addModerator
      </button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={verify} style={{ background: 'blue' }}>
        verify
      </button>
      <br />
      <br />
      <br />
      <br />
      <button onClick={settle} style={{ background: 'blue' }}>
        settle
      </button>
    </div>
  );
}

export default Admin;
