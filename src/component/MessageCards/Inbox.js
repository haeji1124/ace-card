import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

const Inbox = () => {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        const receivedMessages = JSON.parse(
            localStorage.getItem(`receivedMessages_${authCtx.email}`) || '[]'
        );

        const sortedMessages = receivedMessages.sort((a, b) =>
            new Date(b.timestamp) - new Date(a.timestamp)
        );

        setMessages(sortedMessages);
    }, [authCtx.email]);

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

    const handleMessageClick = (message) => {
        setSelectedMessage(message);
        setIsModalOpen(true);

        // 메시지를 읽음 상태로 업데이트
        const updatedMessages = messages.map(msg => {
            if (msg.id === message.id) {
                return { ...msg, isRead: true };
            }
            return msg;
        });

        // localStorage 업데이트
        localStorage.setItem(
            `receivedMessages_${authCtx.email}`,
            JSON.stringify(updatedMessages)
        );

        setMessages(updatedMessages);
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <h1 className="text-2xl font-bold mb-6">받은 메시지함</h1>

            {messages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                    받은 메시지가 없습니다.
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
                                    보낸 사람
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
                                    className={`hover:bg-gray-50 cursor-pointer ${!message.isRead ? 'font-semibold bg-blue-50' : ''
                                        }`}
                                    onClick={() => handleMessageClick(message)}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDate(message.timestamp)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {message.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {message.from}
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

            {/* 메시지 상세 보기 모달 */}
            {isModalOpen && selectedMessage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
                        {/* 모달 헤더 */}
                        <div className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-lg font-semibold">메시지 상세</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700 text-xl"
                            >
                                ×
                            </button>
                        </div>

                        {/* 모달 내용 */}
                        <div className="p-4 flex-1 flex flex-col space-y-4 overflow-hidden">
                            <input
                                type="text"
                                value={selectedMessage.title}
                                className="w-full p-2 border rounded bg-gray-50"
                                readOnly
                            />

                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <input
                                        type="email"
                                        value={`보낸 사람: ${selectedMessage.from}`}
                                        className="w-full p-2 border rounded bg-gray-50"
                                        readOnly
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={`받은 시간: ${formatDate(selectedMessage.timestamp)}`}
                                        className="w-full p-2 border rounded bg-gray-50"
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="flex-1 border rounded">
                                <Viewer
                                    initialValue={selectedMessage.content}
                                    height="100%"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inbox;