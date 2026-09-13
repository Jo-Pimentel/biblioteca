import Link from "next/link";

export default function CatalogoItens() {
    return (
        <div className="catalogo">
            <Link href={'/cadastroItem'}>Cadastrar novo item</Link>
        </div>
    )
}