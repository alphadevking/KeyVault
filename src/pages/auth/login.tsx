import {
    Box,
    Stack,
    Text,
    Input,
    Button,
    Separator,
    HStack,
    Container,
    Link,
    Spinner,
} from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';
import { Link as RLink, useNavigate } from "react-router";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../schemas/loginSchema';
import { z } from 'zod';
import { useState } from 'react';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { localLogin } from '../../api/auth';
import { toaster, Toaster } from '../../components/ui/toaster';
import useAuthStore from '../../store/authStore';
import { getUserProfile } from '../../api/user';
import { convertDurationToNumbers } from 'duratii';

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors }, setValue, trigger } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const [loadingData, setLoadingData] = useState({
        isSubmitting: false,
    });

    const setLoading = (key: string, value: boolean) => {
        setLoadingData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const router = useNavigate();

    const handleLogin = async ({
        email,
        expiresIn, // The expiry value returned by the server (in seconds)
    }: {
        email: string;
        expiresIn: string;
    }) => {
        try {
            // Since the server set the HTTP‑only cookie automatically, simply fetch the user profile.
            const user = await getUserProfile(email);

            // Save the user info (and optionally expiry) in the authStore.
            useAuthStore.getState().loginUser(user, Date.now() + convertDurationToNumbers(expiresIn).totalMilliseconds);

            // Optionally navigate after login.
            setTimeout(() => {
                router('/');
            }, 3000);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const onSubmit = async (data: LoginFormData) => {
        setLoading('isSubmitting', true);
        // console.log(data);
        const promise = localLogin(data);

        toaster.promise(promise, {
            success: (response) => {
                const { email, expiresIn } = response;

                handleLogin({
                    email,
                    expiresIn,
                });

                return {
                    title: "Successfully logged in!",
                    description: "Redirecting to dashboard...",
                };
            },
            error: (error) => ({
                title: "Login failed",
                description: error.message || "Something went wrong with the login",
            }),
            loading: {
                title: "Logging in...",
                description: "Please wait",
            },
            finally() {
                setValue('password', ''); // Clear the password field()
                setLoading('isSubmitting', false);
            },
        });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setValue('password', value);
        trigger('password');
    };

    return (
        <Container maxW="container.sm" p={4}>
            <Stack maxW={"md"} mx={"auto"} spaceY={4}>
                <Box textAlign="right">
                    <Text color="gray.600" fontSize={"xs"}>
                        @{new Date().getFullYear()} KeyVault &copy;
                    </Text>
                </Box>

                <Text
                    fontSize={24}
                    fontWeight="normal"
                    textAlign="left"
                    opacity={0.8}
                >
                    Log in to your account
                </Text>

                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                    <Stack spaceY={1}>
                        <Box>
                            <Text fontWeight="bold">Email</Text>
                            <Input
                                type='email'
                                placeholder="me@example.com"
                                {...register("email")}
                            />
                            {errors.email && (
                                <Text color="red.500" fontSize="sm" mt={1}>
                                    {errors.email.message}
                                </Text>
                            )}
                        </Box>
                        <Box>
                            <Text fontWeight="bold">Password</Text>
                            <Box position="relative">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    {...register("password")}
                                    onChange={handlePasswordChange}
                                />
                                <Box position="absolute" right={0} top="50%" transform="translateY(-50%)">
                                    <Button variant="plain" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <LuEyeOff size={16} /> : <LuEye size={16} />}
                                    </Button>
                                </Box>
                            </Box>
                            {errors.password && (
                                <Text color="red.500" fontSize="sm" mt={1}>
                                    {errors.password.message}
                                </Text>
                            )}
                        </Box>
                        <Button
                            type="submit"
                            variant="solid"
                            size="lg"
                            height="48px"
                            width="100%"
                            _hover={{
                                transform: 'translateY(-2px)',
                                filter: 'brightness(1.1)',
                                transition: 'all 0.2s ease-in-out'
                            }}
                            rounded={"lg"}
                            disabled={loadingData.isSubmitting}
                        >
                            <Spinner size="xs" display={loadingData.isSubmitting ? 'inline-block' : 'none'} />Log In
                        </Button>
                    </Stack>
                </form>

                <HStack my={4}>
                    <Separator />
                    <Text color="gray.500" px={4} fontSize="14px">
                        OR
                    </Text>
                    <Separator />
                </HStack>

                <Stack spaceY={3}>
                    <Button
                        variant="outline"
                        width="100%"
                        height="48px"
                        borderRadius="8px"
                        borderColor="gray.300"
                    >
                        <FaGoogle size={18} /> Continue with Google
                    </Button>
                </Stack>

                <Text fontSize="12px" color="gray.600" textAlign="center" mt={4}>
                    By tapping Continue with Google, you agree to Nexhub Labs'{' '}
                    <Link as={RLink} href="/terms" color="blue.500" textDecoration="underline">
                        Terms of Use
                    </Link>
                    {' '}and{' '}
                    <Link as={RLink} href="/privacy" color="blue.500" textDecoration="underline">
                        Privacy Policy
                    </Link>
                    .
                </Text>
            </Stack>
            <Toaster />
        </Container>
    );
};

export default LoginPage;
