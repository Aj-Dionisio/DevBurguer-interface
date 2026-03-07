import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { toast } from "react-toastify";
import { Container, Form, LeftContainer, RightContainer, Title, InputContainer,Link } from "./styles";
import { Button } from "../../components/Button";
import Logo from '../../assets/Logo.png';
import { api } from '../../services/Api';
import { useNavigate } from "react-router-dom";


export default function Login() {
    const navigate = useNavigate();


const schema = yup.object({
        email: yup.string().required('O e-mail é obrigatório').email('Digite um e-mail valido'),
        password: yup.string().min(6, 'a senha deve ter no minimo 6 caracteres').required('Digite sua senha'),
    }).required(); /*validação de dados,se estão de acordo com o que estamos pedindo*/

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = async data => {
        const response = await toast.promise(api.post('/sessions', {
            email: data.email,
            password: data.password,
        }),
            {
                pending: 'Verificando seus dados',
                success: {
                    render(){
                        setTimeout(() => {
                            navigate('/');
                        }, 2000);
                        return 'Seja Bem-vindo(a) 👌'
                    }
                },
                error: 'Email ou senha errado 🤯'
            },
        );
        console.log(response)
    }
    
    return (
    <Container>
        <LeftContainer>
            <img src={Logo} alt="logo-devburguer" />
        </LeftContainer>

        <RightContainer>
            <Title>
                Olá, seja bem vindo ao <span>Dev Burguer!</span>
                <br />
                Acesse com seu <span>Login e senha.</span>
            </Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <InputContainer>
                    <label>Email: </label>
                    <input type="email" {...register("email")} />
                    <p>{errors?.email?.message}</p>
                </InputContainer>

                <InputContainer>
                    <label>Senha: </label>
                    <input type="password" {...register("password")} />
                    <p>{errors?.password?.message}</p>
                </InputContainer>


                <Button type="submit">Entrar</Button>

            </Form>
            <p>Não possui conta? <Link to="/cadastro">Clique aqui!</Link></p>

        </RightContainer>


    </Container>
    );
}