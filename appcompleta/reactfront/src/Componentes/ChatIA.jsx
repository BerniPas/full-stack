
import '../css/chat.css';

const ChatIA = () => {
    return (
        <>
            <div class="container propia">
                <div class="text-center mt-5">
                    <h1>
                        Chatbot de Aprendizaje Web
                    </h1>
                    <p>
                        Bienvenido a nuestro chatbot de aprendizaje web, aquí podrás aprender sobre los temas más importantes de
                        la web. Puedes consultar temas de Html, Css y JavaScript. ¡Comienza a aprender ahora!
                    </p>
                </div>
            </div>

            <div class="container mt-5 mb-5">
                <iframe 
                    className="chat" 
                    src="https://www.chatbase.co/chatbot-iframe/B_I-FCxwlYAp_atE6NFdi"  
                />
            </div>
        </>
    )
}

export default ChatIA
