import {BotaoAdote} from "@/components/myui/BotaoPadrao/Botao.tsx";


export default function ConhecaSeuPet() {
    return (
        <section className="p-5 font-dosis">
            <div className="flex flex-col w-full items-center max-w-screen-xl mx-auto px-4 gap-6">
                <div>
                    <h1 className="text-4xl text-shadow-md leading-tight font-extrabold font-dosis py-5">
                        Conheça melhor seu novo Pet!
                    </h1>
                </div>
                <div className="flex flex-col gap-10">

                <div className="flex flex-row px-30 gap-8 items-center hover:bg-emerald-100 hover:shadow-xl transition-discrete duration-1000 py-5 rounded-lg ease-in-out">

                    <div className="flex flex-col py-5">
                        <h1 className="text-3xl font-bold ">Cachorros </h1>
                        <p className="text-2xl font-medium">Leais, carinhosos e sempre prontos para te receber com festa! Os cães adoram estar por perto, seja para um passeio, uma brincadeira ou só para ficar juntinho no sofá. São companheiros perfeitos para quem quer uma amizade cheia de energia e amor incondicional.</p>
                    </div>
                    <img
                        src="/Imagens/TelaInicial/CachorroDesenho.png"
                        alt="Gato com fundo decorativo"
                        className="w-[200px] h-auto "
                    />
                </div>


                    <div className="flex flex-row px-30 gap-8 items-center hover:bg-emerald-100 hover:shadow-xl transition-discrete duration-1000 pt-5 rounded-lg ease-in-out">
                    <img
                        src="/Imagens/TelaInicial/GatoDesenho.png"
                        alt="Gato com fundo decorativo"
                        className="w-[200px] h-auto "
                    />
                    <div className="flex flex-col py-5">
                        <h1 className="text-3xl font-bold">Gatos </h1>
                        <p className="text-2xl font-medium">Charmosos, independentes e cheios de personalidade! Os gatos adoram um bom cochilo ao sol, mas também têm seus momentos de brincadeira e carinho. São companheiros ideais para quem busca um amigo tranquilo, que sabe dar e pedir atenção na hora certa.</p>
                    </div>
                </div>
                </div>
                <section className="mt-5">
                <BotaoAdote to="/adote"tsize="text-[30px]" growOnHover>Adote!</BotaoAdote>
        </section>

                <br/>


            </div>
        </section>
    )
}