import Uptitle from '@/lib/basecomponents/uptitle/uptitle';
import '../form.scss';
import ClientForm from '../client/ClientForm';

export default function Form () {

    return (
        <section className="Form">
            <div className="container">
                <Uptitle><h2 className="title">Форма для связи</h2></Uptitle>
                <ClientForm/>
            </div>
        </section>
    )
}