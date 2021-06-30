import pandas as pd

df=pd.read_csv("google_csv/begriffe.csv")
df1=pd.read_csv("google_csv/Behinderung.csv")
result=df.merge(df1,on="Week")
result = result.drop('Unnamed: 0', axis=1)

print(result.head())
result.to_csv("google_csv/begriffe.csv")
