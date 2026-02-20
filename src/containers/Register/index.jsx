import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { toast } from "react-toastify";
import { Container, Form, LeftContainer, RightContainer, Title, InputContainer } from "./styles";
import { Button } from "../../components/Button";
import Logo from '../../assets/Logo.png';
import { api } from '../../services/Api';



export default function Register() {

      const schema = yup.object({
            name:yup.string().required('O nome é obrigatório'),
            email: yup.string().required('O e-mail é obrigatório').email('Digite um e-mail valido'),
            password: yup.string().min(6, 'a senha deve ter no minimo 6 caracteres').required('Digite sua senha'),
        }).required(); /*validação de dados,se estão de acordo com o que estamos pedindo*/
        confirmPassword:yup.string().required().oneOf([yup.ref('password')],'As senhas devem ser iguais')//confirmação se as senhas são iguais
    
        const { register, handleSubmit, formState: { errors } } = useForm({
            resolver: yupResolver(schema)
        });
        const onSubmit = async data => {
            const response = await toast.promise(api.post('/users', {
                name: data.name,
                email: data.email,
                password: data.password,
            }),
                {
                    pending: 'Verificando seus dados',
                    success: 'Cadastro efetuado com sucesso 👌',
                    error: 'Ops! algo deu errado, tente novamente. 🤯'
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
                <Title>Criar conta!</Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                        <label>Name: </label>
                        <input type="text" {...register("name")} />
                        <p>{errors?.name?.message}</p>
                    </InputContainer>

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

                    <InputContainer>
                        <label>Confirmar senha: </label>
                        <input type="password" {...register("confirmPassword")} />
                        <p>{errors?.confirmPassword?.message}</p>
                    </InputContainer>
    
    
                    <Button type="submit">Criar conta</Button>
    
                </Form>
                <p>Já possui conta? <a>Clique aqui!</a></p>
    
            </RightContainer>
    
    
        </Container>
        );
    }
    