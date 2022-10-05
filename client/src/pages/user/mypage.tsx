import { NextPage } from 'next';
import Head from 'next/head';
import Button from '../../components/common/Button';
import Board from '../../components/common/Board';
import ListCard from '../../components/common/ListCard';
import { myEth } from '../../api/wallet';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { userState } from '../../store/states';
import Title from '../../components/common/Title';

const MyPage: NextPage = ({}) => {
  // 이더리움 잔액 적용
  const [userEth, setUserEth] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [user, setUserstate] = useRecoilState(userState);
  useEffect(() => {
    const fetch = async () => {
      // 사용자의 address값 입력
      const res = await myEth(user.address);
      setUserNickname(res.data.nickname);
      setUserName(res.data.name);
      setUserEmail(res.data.email);
      setUserEth(res.data.balance);
    };
    fetch();
  });
  return (
    <>
      <Head>
        <title>마이페이지</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <main>
        <Title>마이페이지</Title>
        <div className="flex mb-8">
          <div className="flex items-center font-custom font-bold text-black text-2xl mr-4 ml-2">
            {userNickname} 님 안녕하세요!
          </div>
          <Link href="/user/checkpw">
            <Button
              label="비밀번호 수정"
              btnType="normal"
              btnSize="medium"
            ></Button>
          </Link>
        </div>
        <div className="flex flex-col mb-8">
          <div className="flex items-center font-custom font-bold text-black text-2xl mb-4 ml-2">
            내 정보
          </div>
          <Board>
            <div className="flex flex-row mb-4">
              <div className="font-custom font-bold text-lg text-left mr-20">
                이름
              </div>
              <div className="font-custom font-medium text-lg mr-2">
                <h2>{userName}</h2>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="font-custom font-bold text-lg text-left mr-16">
                이메일
              </div>
              <div className="font-custom font-medium text-lg">
                <h2>{userEmail}</h2>
              </div>
            </div>
          </Board>
        </div>
        <div className="flex flex-col mb-8">
          <div className="flex items-center font-custom font-bold text-black text-2xl mb-4 ml-2">
            내 지갑
          </div>
          <Board>
            <div className="flex flex-row mb-4 justify-between">
              <div className="font-custom font-bold text-lg text-left ">
                잔액
              </div>
              <div className="font-custom font-medium text-lg mr-2">
                <h2>{userEth} WEI</h2>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="font-custom font-bold text-lg text-left">
                내 지갑 주소
              </div>
              <div className="font-custom font-medium text-lg">
                {/* 지갑 주소 입력하는 부분 */}
                <h2 className="break-all">{user.address}</h2>
              </div>
            </div>
          </Board>
        </div>
      </main>
    </>
  );
};

export default MyPage;
