# Homework 04 — Source question statements

## Original question for section 1

Consider $$G(s)=\frac{2.5}{s^2+3s+25}.$$

1. Draw by hand the **Bode**, **one-sided Nyquist**, and **Nichols** plots. Bode should be reasonably accurate, as in class; Nyquist and Nichols may be more approximate.
2. Use MATLAB to plot all three responses in **one figure with three subplots**, titles and labeled axes.

*Original tip:* MATLAB `nyquist()` normally includes positive and negative frequencies; for one-sided Nyquist use `freqresp()` or `nyquist()` outputs `[real,imag,wout]`, reshaping/squeezing returned arrays as necessary.

---

## Original question for section 2

Consider $$G(s)=\frac{0.6(s+30)}{s^2+4.2s+9}.$$

1. Draw by hand the **Bode**, **one-sided Nyquist**, and **Nichols** plots. Bode should be reasonably accurate, as in class; Nyquist and Nichols may be more approximate.
2. Use MATLAB to plot all three responses in **one figure with three subplots**, titles and labeled axes.

*Original tip:* MATLAB `nyquist()` normally includes positive and negative frequencies; for one-sided Nyquist use `freqresp()` or `nyquist()` outputs `[real,imag,wout]`, reshaping/squeezing returned arrays as necessary.

---

## Original question for section 3

Consider $$G(s)=\frac{200(s+10)}{s(s^2+14s+100)}.$$

1. Draw by hand the **Bode**, **one-sided Nyquist**, and **Nichols** plots. Bode should be reasonably accurate, as in class; Nyquist and Nichols may be more approximate.
2. Use MATLAB to plot all three responses in **one figure with three subplots**, titles and labeled axes.

*Original tip:* MATLAB `nyquist()` normally includes positive and negative frequencies; for one-sided Nyquist use `freqresp()` or `nyquist()` outputs `[real,imag,wout]`, reshaping/squeezing returned arrays as necessary.

---

## Original question for section 4

Consider $$G(s)=\frac{-200(s-10)}{s(s^2+43s+1000)}.$$

1. Draw by hand the **Bode**, **one-sided Nyquist**, and **Nichols** plots. Bode should be reasonably accurate, as in class; Nyquist and Nichols may be more approximate.
2. Use MATLAB to plot all three responses in **one figure with three subplots**, titles and labeled axes.

*Original tip:* MATLAB `nyquist()` normally includes positive and negative frequencies; for one-sided Nyquist use `freqresp()` or `nyquist()` outputs `[real,imag,wout]`, reshaping/squeezing returned arrays as necessary.

---

## Original question for section 5

Consider the cruise-control feedback loop with a **PI controller** $C(s)=k_p+k_I/s$, plant $G(s)=1/(s+1)$, disturbance $d$ added before the plant and sensor noise $n$ added in the measurement path. The aim is to understand how disturbance and noise affect the output.

(a) Compute the transfer functions from $d$ and $n$ to output $y$.

(b) Plot their Bode responses using MATLAB for $k_I=4$ and $k_p=1$.

(c) Identify the frequencies where the disturbance and the noise, respectively, are attenuated to **less than one-tenth** of their input amplitudes.

(d) Choose $k_p$ so that the **maximum disturbance-to-output gain is smaller than 0.1**. Does changing $k_I$ significantly affect that maximum?

![Original PI cruise-control block diagram](figures/question-hw04-diag5.webp)

*Original figure from the supplied assignment/exam. Included here so the question can be answered without the PDF.*
