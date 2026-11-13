# Homework 03 — Source question statements

## Original question for section 1

The original assignment includes three **textbook-only** problem references:

- **Problem 1:** “Problem 3.26 in the textbook.”
- **Problem 2:** “Problem 3.30 in the textbook.”
- **Problem 3:** “Problem 3.37 in the textbook.”

No statements or diagrams for these textbook problems were embedded in the supplied homework PDF. The general techniques below are preparation, **not** purported full solutions to unknown questions.

---

## Original question for section 2

Discard negligible poles and zeros of the **de Havilland Beaver elevator-to-pitch-rate transfer function** identified in Homework 2. Start with the **ninth-order** transfer function from Homework 2, Problem 1.

1. Use MATLAB `pzmap` to inspect poles and zeros; include the plot. Use class guidelines to discard pole–zero factors with negligible effects on the step response, justifying **every** omission. You may construct a new pole–zero–gain model, but must preserve the original **DC gain and sign**.
2. Write out (or include a screenshot of) the final reduced-order elevator-to-pitch-rate transfer function.
3. Plot step responses of the original ninth-order and reduced-order models on the **same figure**, with labeled axes, title, and legend.

**Source limitation:** The ninth-order aircraft model is generated using separate Homework 2 Simulink material and was not supplied here.

---

## Original question for section 3

Consider the closed-loop reference-to-output transfer function
$$T(s)=\frac{100}{s^2+4s+100}.$$

1. Create a Bode plot of $T(s)$ in MATLAB.
2. Is sensor noise amplified above **1 dB** in any frequency range? (Hint in the assignment: Homework 2 Problem 5.)
3. Is the reference signal amplified in any frequency range?
4. Design a **prefilter** before $T(s)$ to make the overall closed loop equal exactly
$$T_{ideal}(s)=\frac{100}{s^2+16s+100}.$$
5. Plot the step response of the original system and the prefiltered system.
6. With the prefilter in place, how has the transfer function from **measurement noise to output** changed?