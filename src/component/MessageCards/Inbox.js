import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { Viewer } from "@toast-ui/react-editor";
import { Mail, X, Search, User, Clock } from "lucide-react";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const receivedMessages = JSON.parse(
      localStorage.getItem(`receivedMessages_${authCtx.email}`) || "[]"
    );

    const sortedMessages = receivedMessages.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );

    setMessages(sortedMessages);
  }, [authCtx.email]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };

    return new Date(dateString).toLocaleString("ko-KR", options);
  };

  const handleMessageClick = (message) => {
    setSelectedMessage(message);

    setIsModalOpen(true);

    // 메시지를 읽음 상태로 업데이트

    const updatedMessages = messages.map((msg) => {
      if (msg.id === message.id) {
        return { ...msg, isRead: true };
      }

      return msg;
    });

    localStorage.setItem(
      `receivedMessages_${authCtx.email}`,

      JSON.stringify(updatedMessages)
    );

    setMessages(updatedMessages);
  };

  const filteredMessages = messages.filter(
    (message) =>
      message.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.from.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = messages.filter((msg) => !msg.isRead).length;

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      {/* 헤더 섹션 */}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">받은 메시지함</h1>

          <p className="text-sm text-gray-500">
            읽지 않은 메시지 {unreadCount}개가 있습니다
          </p>
        </div>

        {/* 검색바 */}

        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="메시지 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />

          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          받은 메시지가 없습니다.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((message, index) => (
            <div
              key={message.id}
              onClick={() => handleMessageClick(message)}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 cursor-pointer animate-slideIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-2 rounded-lg ${
                    message.isRead ? "bg-gray-100" : "bg-blue-100"
                  }`}
                >
                  <Mail
                    className={`w-5 h-5 ${
                      message.isRead ? "text-gray-500" : "text-blue-500"
                    }`}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3
                      className={`text-lg ${
                        !message.isRead ? "font-semibold" : ""
                      }`}
                    >
                      {message.title}
                    </h3>

                    {!message.isRead && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full animate-pulse">
                        새 메시지
                      </span>
                    )}
                  </div>

                  <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />

                      {message.from}
                    </div>

                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />

                      {formatDate(message.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 메시지 상세 보기 모달 */}

      {isModalOpen && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] flex flex-col animate-slideUp">
            {/* 모달 헤더 */}

            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedMessage.title}
                </h2>

                <div className="flex gap-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />

                    {selectedMessage.from}
                  </div>

                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />

                    {formatDate(selectedMessage.timestamp)}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* 모달 본문 */}

            <div className="p-6 overflow-y-auto flex-1">
              <Viewer initialValue={selectedMessage.content} />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;

            transform: translateY(10px);
          }

          to {
            opacity: 1;

            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;

            transform: translateY(20px);
          }

          to {
            opacity: 1;

            transform: translateY(0);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Inbox;
