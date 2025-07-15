export default function ConteudoColabore() {
    return (
        <div className="flex flex-col items-center py-10 px-4 font-dosis">
            {/* Bloco 1 */}
            <div className="flex flex-col bg-gray-50 rounded-lg p-10 max-w-xl w-full gap-6 text-center mb-10 transition-discrete duration-1000 shadow-md hover:shadow-xl">
                <h1 className="text-4xl font-bold mb-4">Colabore com a nossa missão</h1>
                <p className="text-xl mb-4">
                    Nosso objetivo é dar visibilidade aos cães e gatos que estão procurando um lar e conectá-los com pessoas que querem ter um bichinho.
                    <br />
                    Ao fazer sua doação, você nos ajuda a continuar esse trabalho!
                    <br />
                    Muita gente acha que doar dinheiro é pouco, mas faz muita diferença. Temos custos para manter o site funcionando e para remunerar os profissionais que não são voluntários. As doações que recebemos permitem que nosso projeto continue existindo.
                </p>
                <div className="flex justify-center items-center mb-4">
                    <img
                        src="/Imagens/Colabore/LogoPix.png"
                        alt="Pix logo"
                        className="h-26 mr-2"
                    />
                </div>
                <img
                    src="/Imagens/Colabore/QRCode.png"
                    alt="QR Code para doação"
                    className="mx-auto mb-4 h-60 "
                />

                <p className="text-xl ">
                    <strong>Chave pix (CNPJ):</strong><br />
                    21.328.732/0001-85
                    <br />
                    <strong>Nome:</strong><br />
                    Adote um Pet
                    <br />
                    <strong>Banco:</strong><br />
                    Santander
                </p>

            </div>

        </div>
    );
}
