# Final — Source question statements

## Original question for section 1

A **step input of magnitude 4** is applied at **$t=1.2$ seconds** to an unknown system. Use the original **noisy step response** plotted below.

1. Using only that response, **estimate** a transfer function.
2. What are the **zeros**?
3. What are the **poles**?
4. Is the system **stable**? Explain using poles and/or zeros.
5. Is its transfer function **proper**, **strictly proper**, or **improper**?
6. Draw a **Bode plot** for your estimated transfer function.

![Original noisy final-exam step response](figures/question-fin-p1-step.webp)

*Original figure from the supplied assignment/exam. Included here so the question can be answered without the PDF.*


---

## Original question for section 2

Consider unity negative feedback with proportional controller $C(s)=k_p$ and plant
$$P(s)=\frac15\frac{(s-1)^2}{s(s+1)^2}.$$

The exam provides the plant's **Bode and Nyquist plots**.

(a) Use the **Nyquist criterion** to determine the range of $k_p$ for which the system is stable.

(b) Determine **gain crossover frequency** $\omega_{co}$ and **phase margin** when $k_p=\tfrac14$.

![Original negative-feedback controller and plant arrangement](figures/question-fin-p2-block.webp)

*Original figure from the supplied assignment/exam. Included here so the question can be answered without the PDF.*


![Original Bode and Nyquist plots for final Problem 2](figures/question-fin-p2-plots.webp)

*Original figure from the supplied assignment/exam. Included here so the question can be answered without the PDF.*


---

## Original question for section 3

Simulations show a reentry vehicle experiencing a sustained **$20^\circ$** sideslip oscillation at frequency $\omega_f$ at high Mach number. The team asks whether rudder control can reduce the amplitude.

1. Draw a block diagram with the **disturbance**, **plant**, and **controller**. Use plant $G(s)=\beta(s)/\delta_r(s)$ where $\beta$ is sideslip and $\delta_r$ rudder deflection.
2. Specify the **closed-loop transfer function** used to study attenuation, including its elements.
3. Sketch the **magnitude Bode response** needed to reduce oscillation by **a factor of 10**, while not affecting rigid-body roll/pitch/yaw motion for $\omega<\omega_f/10$.
4. What requirement does this put on the **loop transfer function**?

---

## Original question for section 4

The original exam gives the **plant Bode magnitude and phase** plotted below.

1. Choose a **proportional feedback gain** $K$ giving **0.1 steady-state error** to a **unit reference step**, in unity negative feedback.
2. Draw the proportional-control **loop transfer function** on the given Bode figure.
3. If necessary, add **compensation** so **gain margin is at least 8 dB** and **phase margin at least $60^\circ$**. Draw the final loop transfer function.
4. Give the final controller; if it includes compensation, specify its **poles, zeros and rationale**.
5. What are the final **gain and phase margins**?

![Original plant Bode magnitude and phase curves for final Problem 4](figures/question-fin-p4-plots.webp)

*Original figure from the supplied assignment/exam. Included here so the question can be answered without the PDF.*


---

## Original question for section 5

**Extra credit, 10 points.** The exam supplies a **Nichols plot of the loop transfer function**, shown below.

1. Specify controller design elements giving **gain margins of $\pm8$ dB** and **phase margins of $\pm60^\circ$**.
2. Draw the new, modified **loop shape** on top of the original Nichols plot.

![Original final-exam Nichols plot for extra credit](figures/question-fin-extra-nichols.webp)

*Original figure from the supplied assignment/exam. Included here so the question can be answered without the PDF.*
