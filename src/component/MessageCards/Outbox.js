import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../store/auth-context';

const Outbox = () => {
  const [messages, setMessages] = useState([]);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    console.log('Current user email:', authCtx.email);
    const key = `sentMessages_${authCtx.email}`;
    console.log('Looking for sent messages with key:', key);
    
    const sentMessages = JSON.parse(
      localStorage.getItem(key) || '[]'
    );
    console.log('Found sent messages:', sentMessages);
    
    // 날짜 기준 내림차순 정렬 (최신 메시지가 위로)
    const sortedMessages = sentMessages.sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    );
    
    setMessages(sortedMessages);
  }, [authCtx.email]);

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleString('ko-KR', options);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">보낸 메시지함</h1>
      
      {messages.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          보낸 메시지가 없습니다.
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  날짜
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  제목
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  받는 사람
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {messages.map((message) => (
                <tr 
                  key={message.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    // TODO: 메시지 상세 보기 구현
                    console.log('Message clicked:', message);
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(message.timestamp)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {message.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {message.to}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {message.isRead ? '읽음' : '안읽음'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Outbox;