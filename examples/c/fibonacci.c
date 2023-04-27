unsigned long long fibonacci(unsigned int n)
{
    unsigned long long a = 0;
    unsigned long long b = 1;

    for (unsigned int i = 0; i < n; i++)
    {
        unsigned long long c = a + b;
        a = b;
        b = c;
    }

    return a;
}