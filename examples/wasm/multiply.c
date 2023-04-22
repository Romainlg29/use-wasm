void multiply(unsigned int a[], unsigned int b[], unsigned int size)
{
    unsigned int i;

    for (i = 0; i < size; i++)
    {
        a[i] = a[i] * b[i];
    }
}