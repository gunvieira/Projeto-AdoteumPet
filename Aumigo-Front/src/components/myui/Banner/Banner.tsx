import {Botao} from "@/components/myui/BotaoPadrao/Botao.tsx";

export default function Banner() {
    return (
        <section className="gap-3 bg-radial from-teal-300/50 from-50% to-teal-300/10 p-5">

            <div className=" flex flex-col w-full max-w-screen-xl mx-auto px-4 gap-3">
                <div className="flex flex-col gap-10">

                    <div className="flex flex-row justify-between w-full ">
                        <div>
                            <img
                                src="/Imagens/TelaInicial/mulhercomcachorro.jpg"
                                alt="Imagem"
                                className="flex h-[200px] w-auto rounded-md object-cover aspect-video shadow-md/30 border-2 border-teal-950"
                            />
                        </div>
                        <div>
                            <img
                                src="/Imagens/TelaInicial/GatocomMulher.jpg"
                                alt="Imagem"
                                className="flex w-auto h-[200px] rounded-md object-cover aspect-square shadow-md/30 border-2 border-teal-950"
                            />
                        </div>
                        <div>
                            <img
                                src="/Imagens/TelaInicial/gatocomhomem.jpg"
                                alt="Imagem"
                                className="flex w-auto h-[200px] rounded-md object-cover aspect-square shadow-md/30 border-2 border-teal-950"
                            />
                        </div>

                        <div>
                            <img
                                src="/Imagens/TelaInicial/homemcomcachorro.jpg"
                                alt="Imagem"
                                className="flex h-[200px] w-auto rounded-md object-cover aspect-video border-2 shadow-md/30 border-teal-950"
                            />
                        </div>
                    </div>


                    <div className="flex flex-row justify-between items-center w-full ">
                        <div>
                            <img
                                src="/Imagens/TelaInicial/neguinha.png"
                                alt="Imagem"
                                className="flex w-auto h-[250px] rounded-md object-cover aspect-square border-2 shadow-md/30 border-teal-950 "
                            />
                        </div>


                        <div>
                            <div
                                className="flex flex-col rounded-md object-cover bg-teal-900 items-center justify-center p-5 shadow-xl shadow-teal-600/70 ">
                                <div>
                                    <h1 className="font-dosis text-[30px] font-bold text-white px-10">Qual pet mais
                                        combina com você?</h1>
                                </div>
                                <div className="flex flex-row justify-between w-full px-25 py-3">
                                    <Botao to="/adote?especie=Gato" tsize="text-[25px]" growOnHover>Gato</Botao>
                                    <Botao to="/adote?especie=Cachorro" tsize="text-[25px]" growOnHover>Cachorro</Botao>
                                </div>
                            </div>
                        </div>

                        <div>
                            <img
                                src="/Imagens/TelaInicial/Gatonagrama.jpg"
                                alt="Imagem"
                                className="flex w-auto h-[250px] rounded-md object-cover aspect-square border-2 shadow-md/30 border-teal-950"
                            />
                        </div>
                    </div>


                </div>
            </div>
        </section>

    )

}
