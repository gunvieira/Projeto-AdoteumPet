export default function ConteudoQuemSomos() {
    return (
        <div className="flex flex-col items-center py-10 px-4 font-dosis">
            <div
                className="flex flex-col bg-gray-50 rounded-lg p-10 max-w-xl w-full gap-6 items-center mb-10 transition-discrete duration-1000 shadow-sm hover:shadow-xl">
                <div className="flex flex-col itens-center justify-center">
                    <img
                        src="/Imagens/Icons/logo.svg"
                        alt="Logo"
                        className="h-20 w-auto fill-emerald-400"
                    />
                    <span className="text-2xl text-emerald-400 font-bold">Adote um Pet</span>
                </div>

                <div className="flex flex-col itens-start ">

                    <h1 className="text-xl font-bold mb-4">Bem Vindo ao Adote meu Pet!</h1>
                    <p className="text-xl mb-4">
                        Na Adote Um Pet, somos movidos por uma paixão inabalável pela causa animal. Nossa jornada
                        começou em 2023, um ano em que a equipe se uniu na faculdade com o sonho de fazer a diferença. O
                        ponto de partida foi a percepção de que muitos animais ainda esperavam por um lar e que a
                        tecnologia poderia ser uma ponte para conectá-los a famílias amorosas.
                        </p>
                    <p className="text-xl mb-4">
                        Sob a ótima gestão de Jamille, que desde o início soube guiar nossa visão, a Adote Um Pet
                        floresceu. Breno, com seu brilhante desenvolvimento do back-end, garantiu a solidez e a
                        eficiência da nossa plataforma, enquanto Gustavo, com um front-end impecável, tornou a
                        experiência de busca e adoção simples e agradável para todos.
                    </p>
                    <p className="text-xl mb-4">
                        Hoje, somos uma plataforma dedicada a facilitar a adoção de pets, criando laços entre animais
                        que precisam de um lar e pessoas que desejam dar amor. Nossa missão é clara: garantir que cada
                        pet encontre sua família responsável e feliz, e que a alegria da adoção seja compartilhada por
                        todos.
                    </p>
                    <br/>
                    <span className="text-2xl text-black font-bold"> fazer sua doação, você nos ajuda a continuar esse trabalho!</span>
                    <br/>
                    <p className="text-xl mb-4">
                        Muita gente acha que doar dinheiro é pouco, mas faz muita diferença. Temos custos para manter o
                        site funcionando e para remunerar os profissionais que não são voluntários. As doações que
                        recebemos permitem que nosso projeto continue existindo.
                    </p>
                </div>
            </div>
        </div>
    );
}

