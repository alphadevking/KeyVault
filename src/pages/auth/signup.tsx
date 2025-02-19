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
import { signupSchema } from '../../schemas/signupSchema';
import { z } from 'zod';
import { useState } from 'react';
import { LuSquareCheck, LuX, LuEye, LuEyeOff } from 'react-icons/lu';
import { motion } from 'motion/react';
import { localRegister } from '../../api/auth';
import { toaster, Toaster } from '../../components/ui/toaster';

type SignupFormData = z.infer<typeof signupSchema>;

const MotionStack = motion.create(Stack);

const SignupPage = () => {
    const { register, handleSubmit, formState: { errors }, setValue, trigger } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
    });

    const [passwordChecks, setPasswordChecks] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        symbol: false,
        number: false,
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

    const router = useNavigate(); // Initialize the router

    const onSubmit = async (data: SignupFormData) => {
        setLoading('isSubmitting', true);

        // Call the localRegister function with the form data
        const promise = localRegister({
            name: data.name,
            email: data.email,
            password: data.password
        });

        toaster.promise(promise, {
            success: (response) => {
                // Delay the redirection to ensure the user sees the toast message
                setTimeout(() => {
                    router('/login'); // Redirect to the login page
                }, 3000); // 3 seconds delay

                return {
                    title: response.message,
                    description: "Redirecting to login page...",
                };
            },
            error: (error) => ({
                title: "Registration failed",
                description: error.message || "Something went wrong with the registration",
            }),
            loading: {
                title: "Registering...",
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

        setPasswordChecks({
            length: value.length >= 8 && value.length <= 32,
            number: /\d/.test(value),
            uppercase: /[A-Z]/.test(value),
            lowercase: /[a-z]/.test(value),
            symbol: /[!@#$%^&*(),.?":{}|<>]/.test(value),
        });
    };

    const Checker = ({ condition }: { condition: boolean; }) => condition ? <LuSquareCheck size={16} color='green' /> : <LuX size={16} color='red' />;

    return (
        <Container maxW="container.sm" p={4}>
            <Stack maxW={"md"} mx={"auto"} spaceY={4}>
                {/* Header */}
                <Box textAlign="right">
                    <Text color="gray.600" fontSize={"xs"}>
                        @{new Date().getFullYear()} KeyVault &copy;
                    </Text>
                </Box>

                {/* Title */}
                <Text
                    fontSize={24}
                    fontWeight="normal"
                    textAlign="left"
                    opacity={0.8}
                >
                    Create an account
                </Text>

                {/* Combined Form */}
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
                            {passwordChecks.length || passwordChecks.number || passwordChecks.uppercase || passwordChecks.lowercase || passwordChecks.symbol ? (
                                <MotionStack initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }} mt={2} gap={1} fontSize={"xs"} direction='row' justifyContent={"flex-start"} alignItems={"center"}>
                                    <Checker condition={passwordChecks.length} />
                                    <Text title="Password length must be between 8 and 32 characters">8-32 chars</Text>
                                    <Checker condition={passwordChecks.number} />
                                    <Text title="Password must contain at least one digit">Digit</Text>
                                    <Checker condition={passwordChecks.uppercase} />
                                    <Text title="Password must contain at least one uppercase letter">Uppercase</Text>
                                    <Checker condition={passwordChecks.lowercase} />
                                    <Text title="Password must contain at least one lowercase letter">Lowercase</Text>
                                    <Checker condition={passwordChecks.symbol} />
                                    <Text title="Password must contain at least one special character">Symbol</Text>
                                </MotionStack>
                            ) : null}
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
                            <Spinner size="xs" display={loadingData.isSubmitting ? 'inline-block' : 'none'} />Sign Up
                        </Button>
                    </Stack>
                </form>

                {/* Separator */}
                <HStack my={4}>
                    <Separator />
                    <Text color="gray.500" px={4} fontSize="14px">
                        OR
                    </Text>
                    <Separator />
                </HStack>

                {/* Social Buttons */}
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

                {/* Terms */}
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

export default SignupPage;