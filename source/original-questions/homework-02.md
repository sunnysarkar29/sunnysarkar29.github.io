# Homework 02 — Source question statements

## Original question for section 1

Explore linearization of a nonlinear aircraft model using **Simulink**. The assignment refers to the separate MATLAB video **“Trim, Linearization, and Control Design for an Aircraft”** on Canvas and its accompanying downloaded Simulink files. Follow that video to trim the aircraft, then generate a linear **elevator-to-pitch-rate transfer function**. Use MATLAB `minreal` to cancel pole–zero pairs, then:

1. How many **zeros** does the resulting transfer function have?
2. How many **poles**?
3. What is its **relative degree**?
4. What is the **DC gain**?
5. Use MATLAB `step()` to plot pitch-rate response to a unit-step elevator input, and include the plot.

**Source limitation:** The separate Simulink model and video were not included with the supplied PDFs. Numerical answers cannot be recovered from this assignment sheet alone.

---

## Original question for section 2

Turn these ordinary differential equations into transfer functions (with zero initial conditions):

1. $m\ddot x+c\dot x+kx=u+b\dot u$.
2. $\dddot y+\ddot y+y=u$.
3. $\ddot x+2\zeta\omega_n\dot x+\omega_n^2x=\omega_n^2u$.

**Notation check:** In part 2 the first $y$ has **three** time derivatives and the second has **two**; this was checked against the original PDF.

---

## Original question for section 3

**Problem 3:** “Problems 3.7a,b from the 8th edition of the textbook.”

The assignment does **not** reproduce the textbook's two statements or their diagrams. That reference is all the question text supplied; the guide gives a method, but cannot supply an exact question or unique answer without the textbook pages.

---

## Original question for section 4

This problem explores the idea of a **“dominant response.”** Consider

$$G_1(s)=\frac{a}{s+a},\qquad G_2(s)=\frac{b^2}{s^2+2(0.3)bs+b^2},\qquad G_3(s)=\frac{ab^2}{(s+a)[s^2+2(0.3)bs+b^2]}.$$

1. For $a=1,b=10$, plot the step responses of $G_1$ and $G_3$ on labeled axes with a title and legend (MATLAB `step`).
2. For $a=10,b=1$, plot the step responses of $G_2$ and $G_3$ similarly.
3. Comment in a few sentences: are these results expected?

---

## Original question for section 5

Using the block diagram below:

1. Algebraically derive $y(s)$ from the reference $r$, measurement noise $n$, **input disturbance** $d_i$, and **output disturbance** $d_o$, in the form
$$y(s)=(\cdots)r(s)+(\cdots)n(s)+(\cdots)d_o(s)+(\cdots)d_i(s).$$
2. Separately identify the transfer functions $Y/N$, $Y/R$, $Y/D_i$, and $Y/D_o$ by setting the other three inputs to zero.
3. Comment on the similarities between the four transfer functions.

![Original four-input feedback block diagram](figures/question-hw02-diag5.webp)

*Original figure from the supplied assignment/exam. Included here so the question can be answered without the PDF.*
